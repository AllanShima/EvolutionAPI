const db = require('../backend/db'); // Ajuste o caminho conforme sua estrutura

const CampanhasController = {

  // Criar Campanha
  async criar(req, res) { //req é a requisição que será enviada, res: é como o servidor responderá à requisição
    try {
      const { nome_da_campanha, descricao } = req.body;
      
      if (!nome_da_campanha || !descricao) {
        return res.status(400).json({ error: 'Dados incompletos' });
      }

      const [result] = await db.query(
        'INSERT INTO Campanhas (nome_da_campanha, descricao) VALUES (?, ?)',
        [nome_da_campanha, descricao]
      );

        // Se tudo der certo, ele retorna status 200 com o seguinte json:
        res.status(201).json({ 
            success: true,
            id: result.insertId, 
            nome_da_campanha, 
            descricao,
            id_usuario
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao criar campanha',
            details: err.message 
        });
    }
  },

  // Atualizar Campanha
  async atualizar(req, res) {
    try {
        const { id_campanha } = req.params; // ID da campanha a ser atualizada
        const { nome_da_campanha, descricao } = req.body;

        // Validação
        if (!nome_da_campanha || !descricao) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Nome da campanha e descrição são obrigatórios' 
            });
        }

        // Atualiza a campanha
        const [result] = await db.query(
            'UPDATE Campanhas SET nome_da_campanha = ?, descricao = ? WHERE ID = ?',
            [nome_da_campanha, descricao, id_campanha]
        );

        // Atualiza a Campanhas_has_Usuarios SE o ID mudar
        // await db.query(
        //     'UPDATE Campanhas_has_Usuários SET Campanhas_ID = ? WHERE ID = ?',
        //     [nome_da_campanha, descricao, id_campanha]
        // );

        // Verifica se a campanha foi atualizada
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Campanha não encontrada',
                message: 'Nenhuma campanha foi atualizada (ID inválido?)' 
            });
        }

        // Resposta de sucesso
        res.status(200).json({ 
            success: true,
            id_campanha,
            nome_da_campanha, 
            descricao
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao atualizar campanha',
            details: err.message 
        });
    }
  },


  // Listar Campanhas
  async listar(res) {
    try {
        console.log('Executando query: SELECT * FROM Campanhas');

        const [campanhas] = await db.query('SELECT * FROM Campanhas');

        console.log('Resultado:', campanhas);
        res.json(campanhas);

    } catch (err) {
        console.error('Erro na query:', err);
        res.status(500).json({ 
            error: 'Erro no servidor',
            details: err.message 
        });
    }
  },

  // Deletar Campanha
  async deletar(req, res) {
    try {
        const { id_campanha } = req.params;

        // 1. Verificar se a campanha existe
        const [campanha] = await db.query(
            'SELECT ID FROM Campanhas WHERE ID = ? LIMIT 1',
            [id_campanha]
        );

        if (!campanha || campanha.length === 0) {
            return res.status(404).json({
                error: 'Campanha não encontrada',
                message: 'O ID da campanha fornecido não existe'
            });
        }

        // 2. Primeiro deletar os relacionamentos (para evitar erro de chave estrangeira)
        await db.query(
            'DELETE FROM Campanhas_has_Usuários WHERE ID = ?',
            [id_campanha]
        );

        // 3. Depois deletar a campanha
        const [result] = await db.query(
            'DELETE FROM Campanhas WHERE ID = ?',
            [id_campanha]
        );

        // Verificar se foi realmente deletado
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Nada foi deletado',
                message: 'Nenhuma campanha encontrada com este ID'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Campanha e seus relacionamentos foram removidos com sucesso',
            id_campanha: id_campanha
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({
            error: 'Erro ao deletar campanha',
            details: err.message
        });
    }
  }
};

module.exports = CampanhasController; // module.exports: É o objeto padrão que o Node.js usa para exportar funcionalidades de um arquivo (módulo).
// Que no caso exporta as funções do CampanhasController