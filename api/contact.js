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

    // Log the form submission (in production, you'd typically save to a database or send via email service)
    console.log('Quote request received:', {
      name,
      email,
      phone,
      eventDate,
      eventType,
      message: message || 'No additional message',
      timestamp: new Date().toISOString()
    });

    // TODO: In production, integrate with email service like SendGrid, Mailgun, or AWS SES
    // TODO: Or save to database like Supabase, PlanetScale, or MongoDB Atlas

    // For now, just return success
    res.status(200).json({ 
      message: 'Quote request received successfully!',
      data: {
        name,
        email,
        eventType,
        eventDate
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Internal server error. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}