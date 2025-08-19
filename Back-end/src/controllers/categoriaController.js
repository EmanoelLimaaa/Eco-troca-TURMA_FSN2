import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar categoria
export const criarCategoria = async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: "O campo 'nome' é obrigatório" });
  }

  try {
    const categoria = await prisma.categoria.create({
      data: { nome },
    });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar categoria" });
  }
};

// Listar categorias
export const listarCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
};
