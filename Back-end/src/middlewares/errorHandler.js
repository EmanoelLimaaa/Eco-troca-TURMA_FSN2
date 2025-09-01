export function errorHandler(err, req, res, next) {
  console.error("Erro capturado pelo errorHandler:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.message || "Algo deu errado no servidor!",
  });
}