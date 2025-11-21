const baseHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,GET,POST',
  'Access-Control-Allow-Headers':
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
  'Content-Type': 'application/json'
};

const jsonResponse = (statusCode, payload) => ({
  statusCode,
  headers: baseHeaders,
  body: JSON.stringify(payload)
});

const submissionsApiBase = 'https://api.netlify.com/api/v1';

const accessToken = process.env.NETLIFY_API_TOKEN;
const formId = process.env.NETLIFY_FORM_ID;
const adminPassword = process.env.ADMIN_PASSWORD;

const ensureConfig = () => {
  const missing = [];
  if (!accessToken) missing.push('NETLIFY_API_TOKEN');
  if (!formId) missing.push('NETLIFY_FORM_ID');

  if (missing.length) {
    return jsonResponse(500, {
      success: false,
      message: `Missing required configuration: ${missing.join(', ')}`,
      hint: 'Add the variables to your Netlify environment or .env.local file.'
    });
  }
  return null;
};

const authorizeRequest = (event) => {
  if (!adminPassword) {
    return true;
  }
  const authHeader = event.headers?.authorization || event.headers?.Authorization;
  if (!authHeader) {
    return false;
  }
  return authHeader === `Bearer ${adminPassword}`;
};

const fetchSubmissions = async () => {
  const url = `${submissionsApiBase}/forms/${formId}/submissions`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Netlify API error (${response.status}): ${text}`);
  }

  return response.json();
};

const normalizeStatus = (submission) => {
  switch (submission.state) {
    case 'read':
    case 'responded':
      return 'accepted';
    case 'new':
    default:
      return 'pending';
  }
};

const mapSubmission = (submission) => {
  const data = submission.data || {};
  return {
    id: submission.id,
    name: data.name || 'Unknown',
    email: data.email || '',
    phone: data.phone || '',
    eventType: data.eventType || data.event_type || '',
    eventDate: data.eventDate || data.event_date || '',
    message: data.message || '',
    status: normalizeStatus(submission),
    created_at: submission.created_at,
    updated_at: submission.updated_at
  };
};

const summarizeStats = (submissions) => submissions.reduce((acc, submission) => {
  acc.total += 1;
  if (submission.status === 'pending') {
    acc.pending += 1;
  }
  if (submission.status === 'accepted') {
    acc.accepted += 1;
  }
  if (new Date(submission.created_at) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
    acc.last7 += 1;
  }
  return acc;
}, { total: 0, pending: 0, accepted: 0, last7: 0 });

const updateSubmissionState = async (id, status) => {
  const targetState = status === 'accepted' ? 'read' : 'new';

  const response = await fetch(`${submissionsApiBase}/submissions/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      submission: {
        state: targetState
      }
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to update submission (${response.status}): ${text}`);
  }

  return response.json();
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: baseHeaders,
      body: ''
    };
  }

  const configCheck = ensureConfig();
  if (configCheck) {
    return configCheck;
  }

  if (!authorizeRequest(event)) {
    return jsonResponse(401, {
      success: false,
      message: 'Unauthorized. Please provide the admin password.',
      hint: 'Use Authorization: Bearer YOUR_ADMIN_PASSWORD header.'
    });
  }

  if (event.httpMethod === 'GET') {
    try {
      const rawSubmissions = await fetchSubmissions();
      const submissions = rawSubmissions.map(mapSubmission);

      const { status = 'pending' } = event.queryStringParameters || {};
      const normalizedFilter = status.toLowerCase();

      const filtered = normalizedFilter === 'all'
        ? submissions
        : submissions.filter((submission) => submission.status === normalizedFilter);

      const stats = summarizeStats(submissions);

      return jsonResponse(200, {
        success: true,
        submissions: filtered,
        stats: {
          total_requests: stats.total,
          pending_requests: stats.pending,
          accepted_requests: stats.accepted,
          requests_last_7_days: stats.last7
        }
      });
    } catch (error) {
      console.error('Failed to load submissions:', error);
      return jsonResponse(500, {
        success: false,
        message: 'Failed to load submissions',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const payload = JSON.parse(event.body || '{}');
      const { id, status } = payload;

      if (!id || !status) {
        return jsonResponse(400, {
          success: false,
          message: 'Request must include "id" and "status".'
        });
      }

      if (!['pending', 'accepted'].includes(status)) {
        return jsonResponse(400, {
          success: false,
          message: 'Status must be either "pending" or "accepted".'
        });
      }

      await updateSubmissionState(id, status);

      return jsonResponse(200, {
        success: true,
        message: 'Status updated successfully.'
      });
    } catch (error) {
      console.error('Failed to update status:', error);
      return jsonResponse(500, {
        success: false,
        message: 'Failed to update status',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  return jsonResponse(405, {
    success: false,
    message: 'Method not allowed'
  });
};
