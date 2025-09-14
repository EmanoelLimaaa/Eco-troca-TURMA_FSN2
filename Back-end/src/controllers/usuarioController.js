import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { mkdirSync, existsSync } from 'fs';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    // Cria o diretório se não existir
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'usuario-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Apenas imagens são permitidas (jpeg, jpg, png, gif)'));
  }
}).single('foto');

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

export const criarUsuario = (req, res) => {
  console.log('Recebida requisição POST /usuarios');
  console.log('Headers:', req.headers);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body:', req.body);
  console.log('Files:', req.file);

  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Erro no Multer:', err);
      return res.status(400).json({ error: 'Erro no upload da imagem' });
    } else if (err) {
      console.error('Erro no upload:', err);
      return res.status(400).json({ error: err.message });
    }

    try {
      console.log('Corpo da requisição:', req.body);
      
      const { nome, email, senha, cidade, estado, tipo_usuario, idade, sexo } = req.body;
      
      if (!nome || !email || !senha || !cidade) {
        console.error('Campos obrigatórios faltando:', { nome, email, senha, cidade });
        return res.status(400).json({ 
          error: 'Campos obrigatórios faltando',
          required: ['nome', 'email', 'senha', 'cidade']
        });
      }
      
      // Verifica se o email já está em uso
      try {
        const usuarioExistente = await prisma.usuario.findUnique({
          where: { email }
        });

        if (usuarioExistente) {
          console.error('Email já em uso:', email);
          return res.status(400).json({ error: 'Este email já está em uso' });
        }
      } catch (dbError) {
        console.error('Erro ao verificar email existente:', dbError);
        throw dbError;
      }

      // Criptografa a senha
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);

      // Caminho da imagem se foi enviada
      const imagem_perfil = req.file ? `/uploads/${req.file.filename}` : null;

      const userData = {
        nome, 
        email, 
        senha: senhaHash, 
        cidade, 
        estado: estado || 'CE',
        tipo_usuario: tipo_usuario || 'comum',
        imagem_perfil,
        idade: idade ? parseInt(idade) : null,
        sexo: sexo || null
      };
      
      console.log('Tentando criar usuário com dados:', userData);
      
      const novoUsuario = await prisma.usuario.create({
        data: userData
      });

      // Remove a senha do retorno
      const { senha: _, ...usuarioSemSenha } = novoUsuario;
      
      res.status(201).json(usuarioSemSenha);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ 
        error: 'Erro ao processar o cadastro',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });
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

