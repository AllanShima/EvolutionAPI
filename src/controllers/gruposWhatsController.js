const db = require('../backend/db'); // Ajuste o caminho conforme sua estrutura

const GruposWhatsController = {

  async criar(req, res) { //req é a requisição que será enviada, res: é como o servidor responderá à requisição
    try {
        console.log('Corpo recebido:', req.body); // Para debug
        
        const { nome_do_grupo, link_de_convite, grupo_jid, capacidade_max, quantidade_atual, campanha_id } = req.body;
        
        if (!nome_do_grupo || !link_de_convite || !grupo_jid || !capacidade_max || !quantidade_atual || !campanha_id) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Todos os dados são obrigatórios...'
            });
        }

        const [result] = await db.query(
            'INSERT INTO `Grupo Whatsapp` (nome_do_grupo, link_de_convite, grupo_jid, capacidade_max, quantidade_atual, campanha_id) VALUES (?, ?, ?, ?, ?, ?)',
            [nome_do_grupo, link_de_convite, grupo_jid, capacidade_max, quantidade_atual, campanha_id]
        );

        // Se tudo der certo, ele retorna status 200 com o seguinte json:
        res.status(201).json({ 
            success: true,
            id: result.insertId,
            nome_do_grupo,
            link_de_convite,
            grupo_jid,
            capacidade_max,
            quantidade_atual,
            campanha_id
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
        const { id } = req.params; // ID da campanha a ser atualizada
        const { nome_do_grupo, link_de_convite, grupo_jid, capacidade_max, quantidade_atual, campanha_id } = req.body;

        // Validação
        if (!nome_do_grupo || !link_de_convite || !grupo_jid || !capacidade_max || !quantidade_atual || !campanha_id) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Todos os dados são obrigatórios...'
            });
        }

        // Atualiza
        const [result] = await db.query(
            'UPDATE `Grupo Whatsapp` SET nome_do_grupo = ?, link_de_convite = ?, grupo_jid = ?, capacidade_max = ?, quantidade_atual = ?, campanha_id = ? WHERE ID = ?',
            [nome_do_grupo, link_de_convite, grupo_jid, capacidade_max, quantidade_atual, campanha_id, id]
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
            id, 
            nome_do_grupo,
            link_de_convite,
            grupo_jid,
            capacidade_max,
            quantidade_atual,
            campanha_id
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao atualizar Grupo Whats',
            details: err.message 
        });
    }
  },

  async listar(req, res) {
    try {

        console.log('Executando query: SELECT * FROM `Grupo Whatsapp`');

        const [grupoWhats] = await db.query('SELECT * FROM `Grupo Whatsapp`');

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
        const { id } = req.params;

        // Verificando se existe algum grupo com este campanha_id
        const [grupos] = await db.query(
            'SELECT * FROM `Grupo Whatsapp` WHERE campanha_id = ?',
            [id]
        );

        if (!grupos || grupos.length === 0) {
            return res.status(404).json({
                error: 'Grupos não encontrados',
                message: 'Nenhum grupo encontrado com o campanha_id fornecido'
            });
        }

        // Deletar todos os grupos com este campanha_id
        const [result] = await db.query(
            'DELETE FROM `Grupo Whatsapp` WHERE campanha_id = ?',
            [id]
        );

        // Verificar se foi realmente deletado
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Nada foi deletado',
                message: 'Nenhum grupo foi removido'
            });
        }

        res.status(200).json({
            success: true,
            message: `${result.affectedRows} grupo(s) removido(s) com sucesso`,
            campanha_id: id,
            grupos_removidos: result.affectedRows
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

module.exports = GruposWhatsController;