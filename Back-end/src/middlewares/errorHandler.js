export function errorHandler(err, req, res, next) {
  console.error("Erro capturado pelo errorHandler:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.message || "Ops! Tivemos um problema ao processar sua solicitação. Tente novamente em alguns minutos.",
  });
}