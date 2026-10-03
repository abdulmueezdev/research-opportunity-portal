export function errorHandler(err, req, res, next) {
  // Handle JSON parse errors from express.json()
  if (err.type === 'entity.parse.failed' || (err instanceof SyntaxError && err.status === 400 && 'body' in err)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_JSON',
        message: 'Invalid JSON payload',
      },
    });
  }

  // Handle custom errors with status and code
  if (err.status && err.code) {
    return res.status(err.status).json({
      success: false,
      error: {
        code: err.code,
        message: err.message || 'An error occurred',
        ...(err.details ? { details: err.details } : {}),
      },
    });
  }

  // Server-side logging for unexpected errors
  console.error(err);

  // Mask internal details for 500 responses
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
  });
}

export default errorHandler;
