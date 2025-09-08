import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Email service for Jake Cozza DJ Services
 * Handles sending notifications and confirmations
 */
export class EmailService {
  constructor() {
    this.fromEmail = process.env.FROM_EMAIL || 'noreply@jakecozzadj.com';
    this.adminEmail = process.env.ADMIN_EMAIL || 'jakecozza.dj@gmail.com';
  }

  /**
   * Send quote request notification to Jake
   * @param {Object} quoteData - Quote request data
   * @returns {Promise<Object>} - Email send result
   */
  async sendQuoteNotification(quoteData) {
    const { name, email, phone, eventDate, eventType, message } = quoteData;
    
    const emailHtml = this.generateQuoteNotificationHTML(quoteData);
    const emailText = this.generateQuoteNotificationText(quoteData);

    try {
      const result = await resend.emails.send({
        from: this.fromEmail,
        to: [this.adminEmail],
        subject: `🎵 New Quote Request: ${eventType} for ${name}`,
        html: emailHtml,
        text: emailText,
        tags: [
          { name: 'type', value: 'quote_notification' },
          { name: 'event_type', value: eventType.toLowerCase().replace(' ', '_') }
        ]
      });

      console.log('Quote notification sent successfully:', result.id);
      return { success: true, id: result.id };
    } catch (error) {
      console.error('Failed to send quote notification:', error);
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }

  /**
   * Send confirmation email to customer (optional feature)
   * @param {Object} quoteData - Quote request data
   * @returns {Promise<Object>} - Email send result
   */
  async sendCustomerConfirmation(quoteData) {
    const { name, email, eventDate, eventType } = quoteData;
    
    const emailHtml = this.generateCustomerConfirmationHTML(quoteData);
    const emailText = this.generateCustomerConfirmationText(quoteData);

    try {
      const result = await resend.emails.send({
        from: this.fromEmail,
        to: [email],
        subject: '🎧 Thank you for your quote request - Jake Cozza DJ Services',
        html: emailHtml,
        text: emailText,
        tags: [
          { name: 'type', value: 'customer_confirmation' },
          { name: 'event_type', value: eventType.toLowerCase().replace(' ', '_') }
        ]
      });

      console.log('Customer confirmation sent successfully:', result.id);
      return { success: true, id: result.id };
    } catch (error) {
      console.error('Failed to send customer confirmation:', error);
      // Don't throw here - customer confirmation is not critical
      return { success: false, error: error.message };
    }
  }

  /**
   * Generate HTML email template for quote notification to Jake
   */
  generateQuoteNotificationHTML(quoteData) {
    const { name, email, phone, eventDate, eventType, message, created_at } = quoteData;
    const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Quote Request</title>
    <style>
        body { 
            font-family: 'Inter', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%); 
            color: white; 
            padding: 30px; 
            border-radius: 10px; 
            text-align: center; 
            margin-bottom: 30px;
        }
        .content { 
            background: #f8faff; 
            padding: 30px; 
            border-radius: 10px; 
            border-left: 4px solid #6366f1;
        }
        .field { 
            margin-bottom: 20px; 
            padding: 15px; 
            background: white; 
            border-radius: 8px; 
            border: 1px solid #e2e8f0;
        }
        .label { 
            font-weight: 600; 
            color: #6366f1; 
            margin-bottom: 5px; 
        }
        .value { 
            font-size: 16px; 
        }
        .message-box { 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            border: 1px solid #e2e8f0; 
            margin-top: 10px;
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            color: #64748b; 
            font-size: 14px;
        }
        .action-button {
            display: inline-block;
            background: #6366f1;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 5px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎵 New Quote Request</h1>
        <p>A potential client is interested in your DJ services!</p>
    </div>
    
    <div class="content">
        <div class="field">
            <div class="label">👤 Client Name</div>
            <div class="value">${name}</div>
        </div>
        
        <div class="field">
            <div class="label">📧 Email Address</div>
            <div class="value">
                <a href="mailto:${email}" style="color: #6366f1;">${email}</a>
            </div>
        </div>
        
        <div class="field">
            <div class="label">📞 Phone Number</div>
            <div class="value">
                <a href="tel:${phone}" style="color: #6366f1;">${phone}</a>
            </div>
        </div>
        
        <div class="field">
            <div class="label">📅 Event Date</div>
            <div class="value">${formattedDate}</div>
        </div>
        
        <div class="field">
            <div class="label">🎉 Event Type</div>
            <div class="value">${eventType}</div>
        </div>
        
        ${message ? `
        <div class="field">
            <div class="label">💬 Additional Details</div>
            <div class="message-box">${message}</div>
        </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}" class="action-button">📧 Reply to Client</a>
            <a href="tel:${phone}" class="action-button">📞 Call Client</a>
        </div>
    </div>
    
    <div class="footer">
        <p>Quote request submitted on ${new Date().toLocaleString()}</p>
        <p>Jake Cozza DJ Services - Making moments unforgettable 🎧</p>
    </div>
</body>
</html>`;
  }

  /**
   * Generate plain text email for quote notification
   */
  generateQuoteNotificationText(quoteData) {
    const { name, email, phone, eventDate, eventType, message } = quoteData;
    const formattedDate = new Date(eventDate).toLocaleDateString();

    return `
🎵 NEW QUOTE REQUEST - Jake Cozza DJ Services

Client Details:
👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
📅 Event Date: ${formattedDate}
🎉 Event Type: ${eventType}

${message ? `💬 Additional Details:\n${message}\n` : ''}

Contact the client:
- Email: ${email}
- Phone: ${phone}

Quote request submitted on ${new Date().toLocaleString()}
    `;
  }

  /**
   * Generate HTML confirmation email for customer
   */
  generateCustomerConfirmationHTML(quoteData) {
    const { name, eventDate, eventType } = quoteData;
    const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote Request Confirmation</title>
    <style>
        body { 
            font-family: 'Inter', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%); 
            color: white; 
            padding: 30px; 
            border-radius: 10px; 
            text-align: center; 
            margin-bottom: 30px;
        }
        .content { 
            background: #f8faff; 
            padding: 30px; 
            border-radius: 10px; 
        }
        .highlight-box { 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #10b981; 
            margin: 20px 0;
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            color: #64748b; 
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎧 Thank You, ${name}!</h1>
        <p>Your quote request has been received</p>
    </div>
    
    <div class="content">
        <p>Hi ${name},</p>
        
        <p>Thank you for your interest in Jake Cozza DJ Services! I'm excited about the possibility of providing DJ services for your <strong>${eventType}</strong> on <strong>${formattedDate}</strong>.</p>
        
        <div class="highlight-box">
            <h3>🎵 What happens next?</h3>
            <ul>
                <li>I'll review your request within 24 hours</li>
                <li>I'll contact you to discuss your event details and music preferences</li>
                <li>I'll provide a custom quote tailored to your needs</li>
                <li>We'll work together to make your event unforgettable!</li>
            </ul>
        </div>
        
        <p>In the meantime, feel free to reach out if you have any questions:</p>
        <ul>
            <li>📞 Phone: <a href="tel:(312)438-8771">(312) 438-8771</a></li>
            <li>📧 Email: <a href="mailto:jakecozza.dj@gmail.com">jakecozza.dj@gmail.com</a></li>
        </ul>
        
        <p>Looking forward to helping make your special day amazing!</p>
        
        <p>Best regards,<br>
        <strong>Jake Cozza</strong><br>
        Professional DJ Services<br>
        Indianapolis Area</p>
    </div>
    
    <div class="footer">
        <p>Jake Cozza DJ Services - Turning moments into memories 🎵</p>
    </div>
</body>
</html>`;
  }

  /**
   * Generate plain text confirmation email for customer
   */
  generateCustomerConfirmationText(quoteData) {
    const { name, eventDate, eventType } = quoteData;
    const formattedDate = new Date(eventDate).toLocaleDateString();

    return `
🎧 Thank You, ${name}!

Your quote request has been received for your ${eventType} on ${formattedDate}.

What happens next?
- I'll review your request within 24 hours
- I'll contact you to discuss your event details and music preferences  
- I'll provide a custom quote tailored to your needs
- We'll work together to make your event unforgettable!

Contact me anytime:
📞 Phone: (312) 438-8771
📧 Email: jakecozza.dj@gmail.com

Looking forward to helping make your special day amazing!

Best regards,
Jake Cozza
Professional DJ Services
Indianapolis Area

Jake Cozza DJ Services - Turning moments into memories 🎵
    `;
  }
}

// Export a singleton instance
export const emailService = new EmailService();