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

const router = express.Router();

router.post('/', criarItem);
router.get('/', listarItens);
router.get('/:id', buscarItemPorId);
router.put('/:id', atualizarItem);
router.delete('/:id', deletarItem);
router.post('/:id/imagem', uploadMiddleware, uploadImagemItem);

export default router;
