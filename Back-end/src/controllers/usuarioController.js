import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, cidade, estado, tipo_usuario } = req.body;

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha, cidade, estado, tipo_usuario }
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
