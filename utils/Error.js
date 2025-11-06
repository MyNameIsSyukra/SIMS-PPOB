export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // membedakan error buatan vs bug

    Error.captureStackTrace(this, this.constructor);
  }

  static handleZodError(error) {
    const rawErrors = error.errors || error.issues || [];
    const messages = rawErrors.map(e => {
      // cek union
      if (e.code === 'invalid_union' && Array.isArray(e.errors)) {
        const firstInner = e.errors[0][0];
        const field = e.path?.length ? e.path.join('.') : '';
        return field ? `${field}: ${firstInner.message}` : firstInner.message;
      }
      const field = e.path?.length ? e.path.join('.') : '';
      return field ? `${field}: ${e.message}` : e.message;
    });
    return new AppError(messages.join(', '), 400);
  }

  static handleNotFound(resource = 'Resource') {
    return new AppError(`${resource} not found`, 404);
  }

  static handleUnauthorized(message = 'Unauthorized') {
    return new AppError(message, 401);
  }

  static handleForbidden(message = 'Forbidden') {
    return new AppError(message, 403);
  }
}
