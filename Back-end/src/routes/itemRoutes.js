import express from 'express';
import {
  criarItem,
  listarItens,
  buscarItemPorId,
  atualizarItem,
  deletarItem,
} from '../controllers/itemController.js';

const router = express.Router();

router.post('/', criarItem);
router.get('/', listarItens);
router.get('/:id', buscarItemPorId);
router.put('/:id', atualizarItem);
router.delete('/:id', deletarItem);

export default router;
