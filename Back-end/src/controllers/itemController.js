import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const criarItem = async (req, res) => {
  console.log('Recebido para criar item:', req.body);
  const { titulo, descricao, usuarioId, categoriaId, estado_item } = req.body;

  if (!titulo || !descricao || !usuarioId || !categoriaId || !estado_item) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    const item = await prisma.item.create({
      data: {
        titulo,
        descricao,
        usuario_id: usuarioId,
        categoria_id: categoriaId,
        estado_item,
        disponivel: true,
      },
    });
    res.status(201).json(item);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    res.status(500).json({ error: 'Erro ao criar item' });
  }
};

export const listarItens = async (req, res) => {
  const { categoriaId } = req.query;
  try {
    const filtros = {};
    if (categoriaId) filtros.categoria_id = Number(categoriaId);

    const itens = await prisma.item.findMany({ where: filtros });
    res.json(itens);
  } catch (error) {
    console.error('Erro ao listar itens:', error);
    res.status(500).json({ error: 'Erro ao listar itens' });
  }
};

export const buscarItemPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await prisma.item.findUnique({ where: { id: Number(id) } });
    if (!item) return res.status(404).json({ error: 'Item não encontrado' });
    res.json(item);
  } catch (error) {
    console.error('Erro ao buscar item:', error);
    res.status(500).json({ error: 'Erro ao buscar item' });
  }
};

export const atualizarItem = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  try {
    const itemAtualizado = await prisma.item.update({
      where: { id: Number(id) },
      data: dados,
    });
    res.json(itemAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    res.status(500).json({ error: 'Erro ao atualizar item' });
  }
};

export const deletarItem = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.item.delete({ where: { id: Number(id) } });
    res.json({ message: 'Item deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar item:', error);
    res.status(500).json({ error: 'Erro ao deletar item' });
  }
};
