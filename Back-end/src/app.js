import express from "express";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import propostaRoutes from "./routes/propostaRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { validateMiddleware } from "./middlewares/validateMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(validateMiddleware);

app.use("/usuarios", usuarioRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/propostas", propostaRoutes);
app.use("/itens", itemRoutes);


app.use(errorHandler);

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
