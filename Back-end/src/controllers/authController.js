import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt.js';

const prisma = new PrismaClient();

const login = async (req, res) => {
  try {
    console.log('Iniciando processo de login...');
    const { email, senha } = req.body;
    console.log('Email recebido:', email);

    if (!email || !senha) {
      console.log('Email ou senha não fornecidos');
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Verifica se o usuário existe
    console.log('Buscando usuário no banco de dados...');
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      console.log('Usuário não encontrado para o email:', email);
      return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }

    // Verifica a senha
    console.log('Verificando senha...');
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      console.log('Senha inválida para o usuário:', email);
      return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }

    // Gera o token JWT
    console.log('Gerando token JWT...');
    const token = generateToken({ id: usuario.id, email: usuario.email });
    console.log('Token gerado com sucesso');

    // Retorna o token e informações do usuário (sem a senha)
    const { senha: _, ...usuarioSemSenha } = usuario;
    console.log('Login bem-sucedido para o usuário:', usuario.id);
    return res.json({
      message: 'Login realizado com sucesso!',
      usuario: usuarioSemSenha,
      token
    });

  } catch (error) {
    console.error('Erro detalhado no login:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({ 
      error: 'Erro interno no servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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
    return res.status(500).json({ error: 'Opa, Não foi possível carregar os dados do usuário. Tente novamente em alguns minutos.' });
  }
};

export { login, getMe };
