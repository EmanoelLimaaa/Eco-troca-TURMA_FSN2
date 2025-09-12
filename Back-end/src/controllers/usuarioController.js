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

export const teste = (req, res) => {
  res.json({ msg: "API funcionando :)" });
};

// Rota de login
export const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado' });
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Senha inválida' });
    }
    const token = generateToken({ id: usuario.id, email: usuario.email });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro ao fazer login' });
  }
};

