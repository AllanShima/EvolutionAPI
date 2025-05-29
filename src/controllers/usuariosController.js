const db = require('../backend/db'); // Ajuste o caminho conforme sua estrutura

const UsuariosController = {

  async criar(req, res) { //req é a requisição que será enviada, res: é como o servidor responderá à requisição
    try {
        console.log('Corpo recebido:', req.body); // Para debug
        
        const { telefone } = req.body;
        
        if (!telefone) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Telefone é obrigatório'
            });
        }

        const [result] = await db.query(
            'INSERT INTO Usuários (telefone) VALUES (?)',
            [telefone]
        );

        // Se tudo der certo, ele retorna status 200 com o seguinte json:
        res.status(201).json({ 
            success: true,
            id: result.insertId, 
            telefone
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao criar usuario',
            details: err.message 
        });
    }
  },

  async atualizar(req, res) {
    try {
        const { id } = req.params; // ID da campanha a ser atualizada
        const { telefone } = req.body;

        // Validação
        if (!telefone) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Telefone é obrigatório' 
            });
        }

        // Atualiza
        const [result] = await db.query(
            'UPDATE Usuários SET telefone = ? WHERE ID = ?',
            [telefone, id]
        );

        // Atualiza a Campanhas_has_Usuarios SE o ID mudar
        // await db.query(
        //     'UPDATE Campanhas_has_Usuários SET Usuário_ID = ? WHERE ID = ?',
        //     [nome_da_campanha, descricao, id_campanha]
        // );

        // Verifica se foi atualizado
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Usuário não encontrado',
                message: 'Nenhum usuario foi atualizado (ID inválido?)' 
            });
        }

        // Resposta de sucesso
        res.status(200).json({ 
            success: true,
            id,
            telefone
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao atualizar usuario',
            details: err.message 
        });
    }
  },

  async listar(req, res) {
    try {

        console.log('Executando query: SELECT * FROM Usuários');

        const [usuarios] = await db.query('SELECT * FROM Usuários');

        console.log('Resultado:', usuarios);
        res.json(usuarios);

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
        const [usuario] = await db.query(
            'SELECT ID FROM Campanhas WHERE ID = ? LIMIT 1',
            [id]
        );

        if (!usuario || usuario.length === 0) {
            return res.status(404).json({
                error: 'Usuário não encontrada',
                message: 'O ID do usuário fornecido não existe'
            });
        }

        // Primeiro deletar os relacionamentos (para evitar erro de chave estrangeira)
        await db.query(
            'DELETE FROM Campanhas_has_Usuários WHERE Campanhas_ID = ?',
            [id]
        );

        // Depois finalmente deletar
        const [result] = await db.query(
            'DELETE FROM Usuários WHERE ID = ?',
            [id]
        );

        // Verificar se foi realmente deletado
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Nada foi deletado',
                message: 'Nenhum usuário encontrada com este ID'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuário e seus relacionamentos foram removidos com sucesso',
            id: id
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({
            error: 'Erro ao deletar usuário',
            details: err.message
        });
    }
  }
};

module.exports = UsuariosController;