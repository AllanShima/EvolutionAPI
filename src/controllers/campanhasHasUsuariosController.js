const db = require('../backend/db'); // Ajuste o caminho conforme sua estrutura

const Campanhas_Has_Usuarios_Controller = {

  async criar(req, res) { //req é a requisição que será enviada, res: é como o servidor responderá à requisição
    try {
        console.log('Corpo recebido:', req.body); // Para debug
        
        const { campanhas_id, usuarios_id } = req.body;
        
        if (!campanhas_id || !usuarios_id) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Os IDS de campanhas_id e usuarios_id são obrigatórios'
            });
        }

        const [result] = await db.query(
            'INSERT INTO Campanhas_has_Usuários (campanhas_id, usuarios_id) VALUES (?, ?)',
            [campanhas_id, usuarios_id]
        );

        // Se tudo der certo, ele retorna status 200 com o seguinte json:
        res.status(201).json({ 
            success: true,
            campanhas_id,
            usuarios_id
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao atualizar Relação (Campanhas_has_Usuários). Talvez não existe CampanhaID ou UsuárioID?',
            details: err.message 
        });
    }
  },

  async atualizar(req, res) {
    try {
        const { id } = req.params; // ID da campanha a ser atualizada
        const { campanhas_id, usuarios_id } = req.body;

        // Validação
        if (!campanhas_id || !usuarios_id) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Os IDS de campanhas_id e usuarios_id são obrigatórios'
            });
        }

        // Atualiza
        const [result] = await db.query(
            'UPDATE Campanhas_has_Usuários SET campanhas_id = ?, usuarios_id = ? WHERE ID = ?',
            [campanhas_id, usuarios_id, id]
        );

        // Verifica se foi atualizado
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Relação não encontrada',
                message: 'Nenhuma relação foi atualizado (ID inválido?)' 
            });
        }

        // Resposta de sucesso
        res.status(200).json({ 
            success: true,
            campanhas_id,
            usuarios_id
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao atualizar Relação (Campanhas_has_Usuários). Talvez não existe CampanhaID ou UsuárioID?',
            details: err.message 
        });
    }
  },

  async listar(req, res) {
    try {

        console.log('Executando query: SELECT * FROM Campanhas_has_Usuários');

        const [relacao] = await db.query('SELECT * FROM Campanhas_has_Usuários');

        console.log('Resultado:', relacao);
        res.json(relacao);

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
            'SELECT ID FROM Campanhas_has_Usuários WHERE campanhas_id = ? LIMIT 1',
            [id]
        );

        if (!campanha || campanha.length === 0) {
            return res.status(404).json({
                error: 'Campanha não encontrada',
                message: 'O ID da Campanha fornecido não existe'
            });
        }

        // Depois finalmente deletar
        const [result] = await db.query(
            'DELETE FROM Campanha_has_Usuários WHERE campanhas_id = ?',
            [id]
        );

        // Verificar se foi realmente deletado
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Nada foi deletado',
                message: 'Nenhuma relação encontrada com este ID'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Relacionamento removido com sucesso',
            id
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({
            error: 'Erro ao deletar relação entre campanha e usuário (Campanha_has_Usuários)',
            details: err.message
        });
    }
  }
};

module.exports = Campanhas_Has_Usuarios_Controller;