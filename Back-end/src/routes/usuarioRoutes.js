import express from 'express';
import { listarUsuarios, criarUsuario, teste } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', listarUsuarios);
router.post('/', criarUsuario);

router.get('/teste', teste);

export default router;