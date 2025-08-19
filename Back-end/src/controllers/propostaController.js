import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar proposta
export const criarProposta = async (req, res) => {
  const { item_ofertado_id, item_desejado_id, ofertante_id, receptor_id, mensagem } = req.body;

  if (!item_ofertado_id || !item_desejado_id || !ofertante_id || !receptor_id) {
    return res.status(400).json({ error: "Campos obrigatórios: item_ofertado_id, item_desejado_id, ofertante_id, receptor_id" });
  }

  try {
    const proposta = await prisma.proposta.create({
      data: {
        item_ofertado_id,
        item_desejado_id,
        ofertante_id,
        receptor_id,
        mensagem,
        status: "pendente"
      },
    });
    res.status(201).json(proposta);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar proposta" });
  }
};

// Listar propostas de um usuário
export const listarPropostasPorUsuario = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Informe o userId na query string" });
  }

  try {
    const propostas = await prisma.proposta.findMany({
      where: {
        OR: [
          { ofertante_id: Number(userId) },
          { receptor_id: Number(userId) }
        ]
      },
      include: {
        item_ofertado: true,
        item_desejado: true,
      }
    });
    res.json(propostas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar propostas" });
  }
};
