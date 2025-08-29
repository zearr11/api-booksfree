export const errorHandler = (err, req, res, next) => {
  const status = err.status ?? 404
  const message = err.message

  res.status(status).json({
    timestamp: new Date().toISOString(),
    status,
    message,
    path: req.originalUrl
  })
}
