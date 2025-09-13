import { Router } from "express";

const router = Router();

// rota para criar proposta
router.post("/", (req, res) => {
  const { nome, item, data, telefone, descricao } = req.body;

  // simulação de salvar no banco
  console.log("📩 Proposta recebida:", req.body);

  res.status(201).json({
    msg: "Proposta enviada com sucesso!",
    proposta: { nome, item, data, telefone, descricao }
  });
});

export default router;