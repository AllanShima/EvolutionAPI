const db = require('../backend/db'); // Ajuste o caminho conforme sua estrutura

const lojistasController = {

  async criar(req, res) { //req é a requisição que será enviada, res: é como o servidor responderá à requisição
    try {
        console.log('Corpo recebido:', req.body); // Para debug
        
        const { nome_da_loja, id_da_instancia } = req.body;
        
        if (!nome_da_loja || !id_da_instancia) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Nome da loja e id da instância são obrigatórios'
            });
        }

        const [result] = await db.query(
            'INSERT INTO Lojista (nome_do_grupo, link_de_convite, capacidade_max) VALUES (?, ?, ?)',
            [nome_do_grupo, link_de_convite, capacidade_max]
        );

        // Se tudo der certo, ele retorna status 200 com o seguinte json:
        res.status(201).json({ 
            success: true,
            nome_do_grupo,
            link_de_convite,
            capacidade_max
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao criar Grupo Whatsapp',
            details: err.message 
        });
    }
  },

  async atualizar(req, res) {
    try {
        const { id_grupoWhats } = req.params; // ID da campanha a ser atualizada
        const { nome_do_grupo, link_de_convite, capacidade_max } = req.body;

        // Validação
        if (!nome_do_grupo || !link_de_convite || !capacidade_max) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Nome do grupo, Link de convite e capacidade máx são obrigatórios'
            });
        }

        // Atualiza
        const [result] = await db.query(
            'UPDATE Lojista SET nome_do_grupo = ?, link_de_convite = ?, capacidade_max = ? WHERE ID = ?',
            [nome_do_grupo, link_de_convite, capacidade_max, id_grupoWhats]
        );

        // Verifica se foi atualizado
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Grupo Whats não encontrada',
                message: 'Nenhum Grupo Whats foi atualizado (ID inválido?)' 
            });
        }

        // Resposta de sucesso
        res.status(200).json({ 
            success: true,
            id: result.insertId, 
            nome_do_grupo,
            link_de_convite,
            capacidade_max
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao atualizar Grupo Whats',
            details: err.message 
        });
    }
  },

  async listar(res) {
    try {

        console.log('Executando query: SELECT * FROM Lojista');

        const [grupoWhats] = await db.query('SELECT * FROM Lojista');

        console.log('Resultado:', grupoWhats);
        res.json(grupoWhats);

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
        const { id_grupoWhats } = req.params;

        // Verificando se existe
        const [campanha] = await db.query(
            'SELECT ID FROM Lojista WHERE ID = ? LIMIT 1',
            [id_grupoWhats]
        );

        if (!campanha || campanha.length === 0) {
            return res.status(404).json({
                error: 'Grupo Whats não encontrado',
                message: 'O ID do Grupo Whats fornecido não existe'
            });
        }

        // Depois finalmente deletar
        const [result] = await db.query(
            'DELETE FROM Lojista WHERE ID = ?',
            [id_grupoWhats]
        );

        // Verificar se foi realmente deletado
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Nada foi deletado',
                message: 'Nenhum Grupo Whats encontrado com este ID'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Grupo Whats removido com sucesso',
            id_grupoWhats
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({
            error: 'Erro ao deletar Grupo Whats',
            details: err.message
        });
    }
  }
};

module.exports = lojistasController;