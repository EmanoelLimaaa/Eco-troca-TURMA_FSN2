export function validateMiddleware(req, res, next) {
  // Ignora validação para requisições GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Verifica o content-type
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(400).json({  
      erro: "Ops! Parece que o formato da requisição não está correto.",
      dica: "Use o formato JSON (Content-Type: application/json)."});
  }

  // Verifica se o corpo está vazio
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ 
      erro: "Opa! O corpo da requisição está vazio.",
      dica: "Inclua os dados necessários no corpo da requisição em formato JSON." });
  }

  next();
}