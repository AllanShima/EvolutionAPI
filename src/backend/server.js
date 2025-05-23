const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors({
  origin: 'http://localhost:3001', // Ou a porta do seu frontend
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// ------------------------------------------------------------------------

// Rotas de Campanhas

// Buscar Campanhas
app.get('/api/campanhas', async (req, res) => {
  try {
    const [campanhas] = await db.query('SELECT * FROM Campanhas');
    res.json(campanhas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar Campanhas
app.post('/api/campanhas', async (req, res) => {
    try {
        console.log('Corpo recebido:', req.body); // Para debug
        
        const { nome_da_campanha, descricao } = req.body;
        
        if (!nome_da_campanha || !descricao) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Nome da campanha e descrição são obrigatórios' 
            });
        }

        // Verifique o nome exato da sua tabela no MySQL (case sensitive)
        const [result] = await db.query(
            'INSERT INTO Campanhas (nome_da_campanha, descricao) VALUES (?, ?)',
            [nome_da_campanha, descricao]
        );
        
        res.status(201).json({ 
            success: true,
            id: result.insertId, 
            nome_da_campanha, 
            descricao 
        });
    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao criar campanha',
            details: err.message 
        });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});