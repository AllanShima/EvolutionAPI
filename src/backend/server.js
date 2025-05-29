const express = require('express');
const cors = require('cors');
// const db = require('./db');
const routes = require('../routes'); // Importa as rotas centralizadas
const app = express();
const PORT = process.env.PORT || 3001; // Use a variável de ambiente

// Middlewares melhorados
app.use(cors({
  origin: '*', // Permite todos durante desenvolvimento (ajuste para produção)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/api', routes); // Prefixo global '/api'

// Rota para teste de funcionamento da API
app.get('/', (req, res) => {
  res.json({ 
    status: 'online',
    database: process.env.DB_NAME,
    routes: ['/api/']
  });
});

// ---------------------------------------------------------------

// Error handler centralizado
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// ---------------------------------------------------------------

// Inicia o servidor
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

// Tratamento de erros do servidor
server.on('error', (err) => {
  console.error('❌ Erro no servidor:', err);
});