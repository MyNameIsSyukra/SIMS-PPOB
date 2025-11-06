const statusMessages = {
  // Success responses
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',

  // Client error responses
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',

  // Server error responses
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
};

export default function response(res, code, message = null, data = null) {
  // Validation
  if (!res || typeof res.status !== 'function') {
    throw new Error('Invalid response object provided');
  }

  if (!code || typeof code !== 'number') {
    throw new Error('Status code is required and must be a number');
  }

  // Helper function to remove empty values
  function omitEmpty(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) =>
        value !== '' &&
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0)
      )
    );
  }

  // Build response object
  const responseObj = {
    success: code >= 200 && code < 300,
    status: code,
    message: message || statusMessages[code] || (code < 300 ? 'Success' : 'Error'),
    ...(data !== null && { data })
  };

  return res.status(code).json(omitEmpty(responseObj));
}