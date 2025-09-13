import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt.js';

const prisma = new PrismaClient();

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos. Por favor, verifique os dados e tente novamente.'});
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos. Por favor, verifique os dados e tente novamente.' });
    }

    // Gera o token JWT
    const token = generateToken({ id: usuario.id, email: usuario.email });

    // Retorna o token e informações do usuário (sem a senha)
    const { senha: _, ...usuarioSemSenha } = usuario;
    return res.json({
      message:'Login realizado com sucesso!',
      usuario: usuarioSemSenha,
      token
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Ops! Tivemos um problema ao fazer login. Tente novamente em alguns minutos.'});
  }
};

const getMe = async (req, res) => {
  try {
    // O middleware de autenticação já adicionou o ID do usuário ao objeto de requisição
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        nome: true,
        email: true,
        cidade: true,
        estado: true,
        tipo_usuario: true,
        imagem_perfil: true,
        bio: true
      }
    });

    if (!usuario) {
      return res.status(404).json({ error:'Usuário não encontrado. Verifique se está autenticado corretamente.'});
    }

    return res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return res.status(500).json({ error: 'Ops! Não foi possível carregar os dados do usuário. Tente novamente em alguns minutos.' });
  }
};

export { login, getMe };
