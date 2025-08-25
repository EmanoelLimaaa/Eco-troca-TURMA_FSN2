import express from 'express';
import cors from 'cors';

import usuarioRoutes from './routes/usuarioRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import propostaRoutes from './routes/propostaRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/propostas', propostaRoutes);
app.use('/itens', itemRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
