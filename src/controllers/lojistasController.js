const db = require('../backend/db'); // Ajuste o caminho conforme sua estrutura

const LojistasController = {

  async criar(req, res) { //req é a requisição que será enviada, res: é como o servidor responderá à requisição
    try {
        console.log('Corpo recebido:', req.body); // Para debug
        
        const { nome_da_loja } = req.body;
        
        if (!nome_da_loja) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Nome da loja é obrigatórios'
            });
        }

        const [result] = await db.query(
            'INSERT INTO Lojista (nome_da_loja) VALUES (?)',
            [nome_da_loja]
        );

        // Se tudo der certo, ele retorna status 200 com o seguinte json:
        res.status(201).json({ 
            success: true,
            id: result.insertId,
            nome_da_loja
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao criar Lojista',
            details: err.message 
        });
    }
  },

  async atualizar(req, res) {
    try {
        const { id } = req.params; // ID da campanha a ser atualizada
        const { nome_da_loja } = req.body;

        // Validação
        if (!nome_da_loja) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Nome da loja é obrigatório'
            });
        }

        // Atualiza
        const [result] = await db.query(
            'UPDATE Lojista SET nome_da_loja = ? WHERE ID = ?',
            [nome_da_loja, id]
        );

        // Verifica se foi atualizado
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Lojista não encontrada',
                message: 'Nenhum Lojista foi atualizado (ID inválido?)' 
            });
        }

        // Resposta de sucesso
        res.status(200).json({ 
            success: true,
            id, 
            nome_da_loja
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao atualizar Lojista',
            details: err.message 
        });
    }
  },

  async listar(req, res) {
    try {

        console.log('Executando query: SELECT * FROM Lojista');

        const [lojista] = await db.query('SELECT * FROM Lojista');

        console.log('Resultado:', lojista);
        res.json(lojista);

    } catch (err) {

        console.error('Erro na query:', err);

        res.status(500).json({ 
            error: 'Erro no servidor',
            details: err.message 
        });

    }
  },

  async deletar(req, res) {
    try {
        const { id } = req.params;

        // Verificando se existe
        const [campanha] = await db.query(
            'SELECT ID FROM Lojista WHERE ID = ? LIMIT 1',
            [id]
        );

        if (!campanha || campanha.length === 0) {
            return res.status(404).json({
                error: 'Lojista não encontrado',
                message: 'O ID do Lojista fornecido não existe'
            });
        }

        // Depois finalmente deletar
        const [result] = await db.query(
            'DELETE FROM Lojista WHERE ID = ?',
            [id]
        );

        // Verificar se foi realmente deletado
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Nada foi deletado',
                message: 'Nenhum Lojista encontrado com este ID'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lojista removido com sucesso',
            id
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({
            error: 'Erro ao deletar Lojista',
            details: err.message
        });
    }
  }
};

module.exports = LojistasController;