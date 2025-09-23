import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const prisma = new PrismaClient();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export const criarItem = async (req, res) => {
  console.log('Recebido para criar item:', req.body);
  const { titulo, descricao, usuarioId, categoriaId, estado_item } = req.body;

  if (!titulo || !descricao || !usuarioId || !categoriaId || !estado_item) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    // Verifica se há arquivo de imagem enviado
    let imagemPath = null;
    if (req.file) {
      imagemPath = req.file.filename; // Salva o nome do arquivo
    }

    const item = await prisma.item.create({
      data: {
        titulo,
        descricao,
        usuario_id: usuarioId,
        categoria_id: categoriaId,
        estado_item,
        disponivel: true,
        imagem: imagemPath,
      },
    });
    res.status(201).json(item);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    res.status(500).json({ error: 'Erro ao criar item' });
  }
};

export const listarItens = async (req, res) => {
  const { categoriaId, usuarioId } = req.query;
  try {
    console.log('Buscando itens com filtros:', { categoriaId, usuarioId });

    const where = {};
    if (categoriaId) where.categoria_id = Number(categoriaId);
    if (usuarioId) where.usuario_id = Number(usuarioId);

    const itens = await prisma.item.findMany({
      where,
      include: {
        categoria: {
          select: { nome: true }
        },
        usuario: {
          select: { nome: true, cidade: true, estado: true }
        }
      }
    });

    console.log('Itens encontrados:', itens.length);
    res.json(itens);
  } catch (error) {
    console.error('Erro ao listar itens:', error);
    res.status(500).json({
      error: 'Erro ao listar itens',
      details: error.message
    });
  }
};

export const buscarItemPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
      include: {
        categoria: {
          select: { nome: true }
        },
        usuario: {
          select: { nome: true, cidade: true, estado: true }
        }
      }
    });
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
  const userId = req.userId; 

  try {
    // Verifica se o item existe e pertence ao usuário
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
      select: { usuario_id: true }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    if (item.usuario_id !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para atualizar este item' });
    }

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
  const userId = req.userId; // Obtido do middleware de autenticação

  try {
    // Verifica se o item existe e pertence ao usuário
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
      select: { usuario_id: true }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    if (item.usuario_id !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para deletar este item' });
    }

    await prisma.item.delete({ where: { id: Number(id) } });
    res.json({ message: 'Item deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar item:', error);
    res.status(500).json({ error: 'Erro ao deletar item' });
  }
};

export const uploadImagemItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; // Obtido do middleware de autenticação

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    // Verifica se o item existe e pertence ao usuário
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
      select: { usuario_id: true }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    if (item.usuario_id !== userId) {
      return res.status(403).json({ error: 'Você não tem permissão para fazer upload de imagem para este item' });
    }

    const imagemPath = req.file.filename;

    const updatedItem = await prisma.item.update({
      where: { id: Number(id) },
      data: { imagem: imagemPath },
    });

    res.json({ message: 'Imagem enviada com sucesso', item: updatedItem });
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
  }
};

// Middleware para upload
export const uploadMiddleware = upload.single('imagem');
