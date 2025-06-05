const db = require('../backend/db'); // Ajuste o caminho conforme sua estrutura

const CampanhasController = {

  // Criar Campanha
  async criar(req, res) { //req é a requisição que será enviada, res: é como o servidor responderá à requisição
    try {
      const { nome_da_campanha, descricao, lojista_id } = req.body;
      
      if (!nome_da_campanha || !descricao || !lojista_id) {
        return res.status(400).json({ error: 'Dados incompletos' });
      }

      const [result] = await db.query(
        'INSERT INTO Campanhas (nome_da_campanha, descricao, lojista_id) VALUES (?, ?, ?)',
        [nome_da_campanha, descricao, lojista_id]
      );

        // Se tudo der certo, ele retorna status 200 com o seguinte json:
        res.status(201).json({ 
            success: true,
            id: result.insertId, 
            nome_da_campanha, 
            descricao,
            lojista_id
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
        const { id } = req.params; // ID da campanha a ser atualizada. O parametro tem que corresponder com o router
        const { nome_da_campanha, descricao, lojista_id } = req.body;

        // Validação
        if (!nome_da_campanha || !descricao || !lojista_id) {
            return res.status(400).json({ error: 'Dados incompletos',});
        }

        // 1. Verifica se a campanha existe
        const [campanha] = await db.query('SELECT ID FROM Campanhas WHERE id = ?', [id]);
        
        if (!campanha || campanha.length === 0) {
            return res.status(404).json({ 
                error: 'Campanha não encontrada',
                message: `Nenhuma campanha encontrada com ID ${id}` 
            });
        }

        // Atualiza a campanha
        const [result] = await db.query(
            'UPDATE Campanhas SET nome_da_campanha = ?, descricao = ?, lojista_id = ? WHERE ID = ?',
            [nome_da_campanha, descricao, lojista_id, id]
        );

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
            id,
            nome_da_campanha, 
            descricao,
            lojista_id
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
  async listar(req, res) { //req precisa ser adicionado msm n sendo usado para a função res.json funcionar. No Express, res deve ser o segundo parâmetro da rota.
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

  async obterPorID(req, res) { //req precisa ser adicionado msm n sendo usado para a função res.json funcionar. No Express, res deve ser o segundo parâmetro da rota.
    try {
        const { id } = req.params;

        console.log('SELECT * FROM Campanhas WHERE ID = ?');

        const [campanha] = await db.query(
            'SELECT * FROM Campanhas WHERE ID = ?',
            [id]
        );


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
        const { id } = req.params;

        // 1. Verificar se a campanha existe
        const [campanha] = await db.query(
            'SELECT ID FROM Campanhas WHERE ID = ? LIMIT 1',
            [id]
        );

        if (!campanha || campanha.length === 0) {
            return res.status(404).json({
                error: 'Campanha não encontrada',
                message: 'O ID da campanha fornecido não existe'
            });
        }
        // !campanha: Verifica se campanha é null ou undefined (improvável nesse caso, mas é boa prática)
        // campanha.length === 0: Verifica se o array está vazio (ou seja, a consulta não retornou resultados)

        // 2. Verificando se há relacionamento, e deletando ele pra n causar problema

        const [relacionamento] = await db.query(
            'DELETE FROM Campanhas_has_Usuários WHERE Campanhas_ID = ?',
            [id]
        );

        // 3. Depois deletar a campanha
        const [result] = await db.query(
            'DELETE FROM Campanhas WHERE ID = ?',
            [id]
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
            id: id
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