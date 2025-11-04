import { getStore } from '@netlify/blobs';

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

const accessToken = process.env.NETLIFY_ACCESS_TOKEN;
const formId = process.env.NETLIFY_FORM_ID;
const adminPassword = process.env.ADMIN_PASSWORD;

const statusStore = getStore({ name: 'quote-statuses' });
const allowedStatuses = ['pending', 'accepted'];

const ensureConfig = () => {
  const missing = [];
  if (!accessToken) missing.push('NETLIFY_ACCESS_TOKEN');
  if (!formId) missing.push('NETLIFY_FORM_ID');

  if (missing.length) {
    return jsonResponse(500, {
      success: false,
      message: `Missing required configuration: ${missing.join(', ')}`,
      hint: 'Set the variables in your Netlify environment or .env.local file.'
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

const getStatusForSubmission = async (submissionId) => {
  try {
    const stored = await statusStore.get(submissionId);
    if (!stored) {
      return 'pending';
    }
    const parsed = JSON.parse(stored);
    if (allowedStatuses.includes(parsed?.status)) {
      return parsed.status;
    }
    return 'pending';
  } catch (error) {
    console.warn(`Failed to load status for submission ${submissionId}:`, error);
    return 'pending';
  }
};

const setStatusForSubmission = async (submissionId, status) => {
  if (!allowedStatuses.includes(status)) {
    throw new Error(`Invalid status "${status}".`);
  }

  await statusStore.set(submissionId, JSON.stringify({
    status,
    updatedAt: new Date().toISOString()
  }));
};

const mapSubmission = async (submission) => {
  const status = await getStatusForSubmission(submission.id);
  const data = submission.data || {};

  return {
    id: submission.id,
    name: data.name || 'Unknown',
    email: data.email || '',
    phone: data.phone || '',
    eventType: data.eventType || data.event_type || '',
    eventDate: data.eventDate || data.event_date || '',
    message: data.message || '',
    status,
    created_at: submission.created_at,
    updated_at: submission.updated_at
  };
};

const distributeByStatus = (submissions) => submissions.reduce((acc, submission) => {
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
      const submissions = await fetchSubmissions();
      const mapped = await Promise.all(submissions.map(mapSubmission));

      const { status = 'pending' } = event.queryStringParameters || {};
      const normalizedStatus = status.toLowerCase();

      const filtered = normalizedStatus === 'all'
        ? mapped
        : mapped.filter((submission) => {
            if (normalizedStatus === 'accepted') {
              return submission.status === 'accepted';
            }
            return submission.status === normalizedStatus;
          });

      const stats = distributeByStatus(mapped);

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

      if (!allowedStatuses.includes(status)) {
        return jsonResponse(400, {
          success: false,
          message: `Status must be one of: ${allowedStatuses.join(', ')}`
        });
      }

      await setStatusForSubmission(id, status);

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
