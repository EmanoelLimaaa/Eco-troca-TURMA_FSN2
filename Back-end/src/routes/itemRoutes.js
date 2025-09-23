import express from 'express';
import {
  criarItem,
  listarItens,
  buscarItemPorId,
  atualizarItem,
  deletarItem,
  uploadImagemItem,
  uploadMiddleware,
} from '../controllers/itemController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/', criarItem);
router.get('/', listarItens);
router.get('/:id', buscarItemPorId);
router.put('/:id', authMiddleware, atualizarItem);
router.delete('/:id', authMiddleware, deletarItem);
router.post('/:id/imagem', authMiddleware, uploadMiddleware, uploadImagemItem);

export default router;
