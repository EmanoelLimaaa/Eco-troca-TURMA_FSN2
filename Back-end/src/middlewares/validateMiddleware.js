export function validateMiddleware(req, res, next) {
  // Ignora validação para requisições GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Verifica o content-type
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(400).json({ error: 'Content-Type deve ser application/json' });
  }

  // Verifica se o corpo está vazio
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "O corpo da requisição não pode estar vazio." });
  }

  next();
}