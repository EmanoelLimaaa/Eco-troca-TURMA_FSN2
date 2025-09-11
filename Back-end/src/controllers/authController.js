import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import { generateToken } from '../services/tokenService.js';

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
