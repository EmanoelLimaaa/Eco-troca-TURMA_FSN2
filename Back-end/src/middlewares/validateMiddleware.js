export function validateMiddleware(req, res, next) {
  // Ignora validação para requisições GET, HEAD, OPTIONS, DELETE
  if (['GET', 'HEAD', 'OPTIONS', 'DELETE'].includes(req.method)) {
    return next();
  }

  // Verifica o content-type
  if (req.get('content-type') !== 'application/json') {
    return res.status(400).json({
      error: "Formato de requisição não suportado",
      message: "Use application/json"
    });
  }

  // Verifica se o corpo está vazio
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ 
      error: "Corpo da requisição vazio",
      message: "Inclua os dados necessários no corpo da requisição"
    });
  }

  next();
}