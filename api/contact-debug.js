export default async function handler(req, res) {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    // Check environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    const envCheck = {
      supabaseUrl: !!supabaseUrl,
      supabaseKey: !!supabaseKey,
      resendKey: !!resendKey,
      requestBody: req.body
    };

    return res.status(200).json({
      message: 'Debug info',
      environment: envCheck,
      method: req.method
    });

  } catch (error) {
    console.error('Contact debug error:', error);
    return res.status(500).json({ 
      message: 'Debug error',
      error: error.message 
    });
  }
}