import { verifyToken, getTokenFromHeaders } from '../utils/jwt.js';

const authMiddleware = (req, res, next) => {
  const token = getTokenFromHeaders(req);
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }

  // Adiciona o ID do usuário ao objeto de requisição para uso posterior
  req.userId = decoded.id;
  
  next();
};

export default authMiddleware;
