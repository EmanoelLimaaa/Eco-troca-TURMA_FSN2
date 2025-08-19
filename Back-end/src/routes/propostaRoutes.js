import express from 'express';
import { criarProposta, listarPropostasPorUsuario } from '../controllers/propostaController.js';

const router = express.Router();

router.post('/', criarProposta);
router.get('/', listarPropostasPorUsuario);

export default router;
