import { createClient } from '@supabase/supabase-js';
import { emailService } from '../lib/email.js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, eventDate, eventType, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !eventDate || !eventType) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['name', 'email', 'phone', 'eventDate', 'eventType']
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Date validation
    const eventDateObj = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (eventDateObj < today) {
      return res.status(400).json({ message: 'Event date cannot be in the past' });
    }

    // Phone number basic validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\(\)\-\.]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Prepare quote data
    const quoteData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      event_date: eventDate,
      event_type: eventType,
      message: message ? message.trim() : null,
      status: 'pending'
    };

    console.log('Processing quote request:', {
      name: quoteData.name,
      email: quoteData.email,
      eventType: quoteData.event_type,
      eventDate: quoteData.event_date
    });

    let savedQuote = null;
    let emailResult = null;

    // Save to database if Supabase is available
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('quote_requests')
          .insert([quoteData])
          .select()
          .single();

        if (error) {
          console.error('Database error:', error);
          throw new Error(`Database insertion failed: ${error.message}`);
        }

        savedQuote = data;
        console.log('Quote saved to database:', savedQuote.id);
      } catch (dbError) {
        console.error('Failed to save to database:', dbError);
        // Continue without database - don't fail the entire request
      }
    } else {
      console.warn('Supabase not configured - quote not saved to database');
    }

    // Send email notification if email service is configured
    try {
      if (process.env.RESEND_API_KEY) {
        // Add database ID and timestamp to email data
        const emailData = {
          ...quoteData,
          id: savedQuote?.id,
          created_at: savedQuote?.created_at
        };

        emailResult = await emailService.sendQuoteNotification(emailData);
        console.log('Quote notification email sent:', emailResult.id);

        // Optionally send customer confirmation (can be disabled via env var)
        if (process.env.SEND_CUSTOMER_CONFIRMATION !== 'false') {
          try {
            const confirmResult = await emailService.sendCustomerConfirmation(emailData);
            if (confirmResult.success) {
              console.log('Customer confirmation sent:', confirmResult.id);
            } else {
              console.warn('Customer confirmation failed:', confirmResult.error);
            }
          } catch (confirmError) {
            console.warn('Customer confirmation error:', confirmError.message);
            // Don't fail the request if customer confirmation fails
          }
        }
      } else {
        console.warn('Resend API key not configured - email notification not sent');
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Continue without email - don't fail the entire request
    }

    // Return success response
    res.status(200).json({ 
      message: 'Quote request received successfully! Jake will be in touch within 24 hours.',
      data: {
        id: savedQuote?.id,
        name: quoteData.name,
        email: quoteData.email,
        eventType: quoteData.event_type,
        eventDate: quoteData.event_date,
        status: quoteData.status,
        emailSent: !!emailResult?.success,
        created_at: savedQuote?.created_at
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Internal server error. Please try again or contact us directly at jakecozza.dj@gmail.com or (312) 438-8771.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}