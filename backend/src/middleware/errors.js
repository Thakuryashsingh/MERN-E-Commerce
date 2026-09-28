export function notFound(req, res) {
  res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(error, req, res, next) {
  console.error(error);
  if (res.headersSent) return next(error);
  if (error.name === 'CastError') return res.status(404).json({ message: 'Resource not found' });
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(item => ({ field: item.path, message: item.message }));
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  if (error.code === 11000) return res.status(409).json({ message: 'An account with this email already exists' });
  res.status(error.status || 500).json({ message: error.status ? error.message : 'Something went wrong' });
}
