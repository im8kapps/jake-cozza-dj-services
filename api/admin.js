import { createClient } from '@supabase/supabase-js';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Simple authentication check (in production, use proper authentication)
  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (adminPassword) {
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return res.status(401).json({ 
        message: 'Unauthorized. Please provide valid admin credentials.',
        hint: 'Use Authorization: Bearer YOUR_ADMIN_PASSWORD header'
      });
    }
  }

  if (!supabase) {
    return res.status(503).json({ 
      message: 'Database service unavailable',
      error: 'Supabase not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.'
    });
  }

  try {
    const { action } = req.query;

    switch (action) {
      case 'stats':
        return await getStats(res);
      case 'quotes':
        return await getQuotes(req, res);
      default:
        return await getDashboardData(res);
    }

  } catch (error) {
    console.error('Admin API error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

async function getStats(res) {
  try {
    const { data, error } = await supabase
      .from('quote_stats')
      .select('*')
      .single();

    if (error) {
      console.error('Stats query error:', error);
      throw error;
    }

    res.status(200).json({
      success: true,
      stats: data
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
}

async function getQuotes(req, res) {
  try {
    const { 
      page = 1, 
      limit = 50, 
      status, 
      orderBy = 'created_at',
      order = 'desc' 
    } = req.query;

    let query = supabase
      .from('quote_requests')
      .select('*');

    // Filter by status if provided
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    // Apply ordering
    query = query.order(orderBy, { ascending: order === 'asc' });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Quotes query error:', error);
      throw error;
    }

    res.status(200).json({
      success: true,
      quotes: data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quotes',
      error: error.message
    });
  }
}

async function getDashboardData(res) {
  try {
    // Fetch both stats and recent quotes in parallel
    const [statsResult, quotesResult] = await Promise.all([
      supabase.from('quote_stats').select('*').single(),
      supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
    ]);

    if (statsResult.error) {
      console.error('Stats error:', statsResult.error);
    }

    if (quotesResult.error) {
      console.error('Quotes error:', quotesResult.error);
    }

    res.status(200).json({
      success: true,
      dashboard: {
        stats: statsResult.data || {
          total_requests: 0,
          pending_requests: 0,
          contacted_requests: 0,
          booked_requests: 0,
          requests_last_30_days: 0,
          requests_last_7_days: 0
        },
        recentQuotes: quotesResult.data || []
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message
    });
  }
}