import express from 'express';
import { login, getMe } from '../controllers/authController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// Rota de login (publica)
router.post('/login', login);

// Rota para obter informacoes do usuario logado (protegida)
router.get('/me', authMiddleware, getMe);

export default router;
