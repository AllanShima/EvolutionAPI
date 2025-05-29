const db = require('../backend/db'); // Ajuste o caminho conforme sua estrutura

const MensagensController = {

  async criar(req, res) { //req é a requisição que será enviada, res: é como o servidor responderá à requisição
    try {
        console.log('Corpo recebido:', req.body); // Para debug
        
        const { mensagem_de_texto, marcado_para, criado_em, foi_enviado, enviado_em, lojista_id, lojista_grupo_whatsapp_id } = req.body;
        
        if (!mensagem_de_texto || !marcado_para || criado_em === undefined || foi_enviado === undefined || !lojista_id || !lojista_grupo_whatsapp_id) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Todos os dados são obrigatórios'
            });
        }

        // Verifica se existe o lojista e o grupo whats 
        const [lojista] = await db.query(
            'SELECT ID FROM Lojista WHERE ID = ? LIMIT 1',
            [lojista_id]
        );
        if (!lojista || lojista.length === 0) {
            return res.status(404).json({
                error: 'Lojista não encontrado',
                message: `Nenhum lojista encontrado com ID ${lojista_id}`
            });
        }

        const [grupowhats] = await db.query(
            'SELECT ID FROM `Grupo Whatsapp` WHERE ID = ? LIMIT 1',
            [lojista_grupo_whatsapp_id]
        );
        if (!grupowhats || grupowhats.length === 0) {
            return res.status(404).json({
                error: 'Grupo WhatsApp não encontrado',
                message: `Nenhum grupo encontrado com ID ${lojista_grupo_whatsapp_id}`
            });
        }

        const [result] = await db.query(
            'INSERT INTO Mensagens (mensagem_de_texto, marcado_para, criado_em, foi_enviado, enviado_em, lojista_id, lojista_grupo_whatsapp_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [mensagem_de_texto, marcado_para || null, criado_em, foi_enviado, enviado_em || null, lojista_id, lojista_grupo_whatsapp_id]
        );

        // Se tudo der certo, ele retorna status 200 com o seguinte json:
        res.status(201).json({ 
            success: true,
            id: result.insertId,
            mensagem_de_texto,
            marcado_para,
            criado_em,
            foi_enviado,
            lojista_id,
            lojista_grupo_whatsapp_id
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao criar Mensagem',
            details: err.message 
        });
    }
  },

  async atualizar(req, res) {
    try {
        const { id } = req.params; // ID da campanha a ser atualizada
        const { mensagem_de_texto, marcado_para, criado_em, foi_enviado, enviado_em, lojista_id, lojista_grupo_whatsapp_id } = req.body;

        // Validação
        if (!mensagem_de_texto || !marcado_para || criado_em === undefined || foi_enviado === undefined || !lojista_id || !lojista_grupo_whatsapp_id) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Todos os dados são obrigatórios'
            });
        }

        // Verifica se existe o lojista e o grupo whats 
        const [lojista] = await db.query(
            'SELECT ID FROM Lojista WHERE ID = ? LIMIT 1',
            [lojista_id]
        );
        if (!lojista || lojista.length === 0) {
            return res.status(404).json({
                error: 'Lojista não encontrado',
                message: `Nenhum lojista encontrado com ID ${lojista_id}`
            });
        }

        const [grupowhats] = await db.query(
            'SELECT ID FROM `Grupo Whatsapp` WHERE ID = ? LIMIT 1',
            [lojista_grupo_whatsapp_id]
        );
        if (!grupowhats || grupowhats.length === 0) {
            return res.status(404).json({
                error: 'Grupo WhatsApp não encontrado',
                message: `Nenhum grupo encontrado com ID ${lojista_grupo_whatsapp_id}`
            });
        }

        // Atualiza
        const [result] = await db.query(
            'UPDATE Mensagens SET mensagem_de_texto = ?, marcado_para = ?, criado_em = ?, foi_enviado = ?, enviado_em = ?, lojista_id = ?, lojista_grupo_whatsapp_id = ? WHERE ID = ?',
            [mensagem_de_texto, marcado_para, criado_em, foi_enviado, enviado_em, lojista_id, lojista_grupo_whatsapp_id, id]
        );

        // Verifica se foi atualizado
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Mensagem não encontrada',
                message: 'Nenhuma Mensagem foi atualizada (ID inválido?)' 
            });
        }

        // Resposta de sucesso
        res.status(201).json({ 
            success: true,
            id,
            mensagem_de_texto,
            marcado_para,
            criado_em,
            foi_enviado,
            lojista_id,
            lojista_grupo_whatsapp_id
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao atualizar Mensagem',
            details: err.message 
        });
    }
  },

  async listar(req, res) {
    try {

        console.log('Executando query: SELECT * FROM Mensagens');

        const [lojista] = await db.query('SELECT * FROM Mensagens');

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
            'SELECT ID FROM Mensagens WHERE ID = ? LIMIT 1',
            [id]
        );

        if (!campanha || campanha.length === 0) {
            return res.status(404).json({
                error: 'Mensagem não encontrado',
                message: 'O ID da Mensagem fornecido não existe'
            });
        }

        // Depois finalmente deletar
        const [result] = await db.query(
            'DELETE FROM Mensagens WHERE ID = ?',
            [id]
        );

        // Verificar se foi realmente deletado
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Nada foi deletado',
                message: 'Nenhuma Mensagem encontrado com este ID'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Mensagem removido com sucesso',
            id
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({
            error: 'Erro ao deletar Mensagem',
            details: err.message
        });
    }
  }
};

module.exports = MensagensController;