import express from 'express';
import { criarCategoria, listarCategorias } from '../controllers/categoriaController.js';

const router = express.Router();

router.post('/', criarCategoria);
router.get('/', listarCategorias);

export default router;
