const db = require('../backend/db'); // Ajuste o caminho conforme sua estrutura

const MensagensController = {

  async criar(req, res) { //req é a requisição que será enviada, res: é como o servidor responderá à requisição
    try {
        console.log('Corpo recebido:', req.body); // Para debug
        
        const { mensagem_de_texto, marcado_para, criado_em, foi_enviado, enviado_em, Lojista_ID, Lojista_GrupoWhatsapp_ID } = req.body;
        
        if (!mensagem_de_texto || !marcado_para || !criado_em || !foi_enviado || !enviado_em || !Lojista_ID || !Lojista_GrupoWhatsapp_ID) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Todos os dados são obrigatórios'
            });
        }

        const [result] = await db.query(
            'INSERT INTO Mensagens (mensagem_de_texto, marcado_para, criado_em, foi_enviado?, enviado_em, Lojista_ID, `Lojista_Grupo Whatsapp_ID`) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [mensagem_de_texto, marcado_para, criado_em, foi_enviado, enviado_em, Lojista_ID, Lojista_GrupoWhatsapp_ID]
        );

        // Se tudo der certo, ele retorna status 200 com o seguinte json:
        res.status(201).json({ 
            success: true,
            id: result.insertId,
            mensagem_de_texto,
            marcado_para,
            criado_em,
            foi_enviado,
            Lojista_ID,
            Lojista_GrupoWhatsapp_ID
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
        const { id_mensagem } = req.params; // ID da campanha a ser atualizada
        const { mensagem_de_texto, marcado_para, criado_em, foi_enviado, enviado_em, Lojista_ID, Lojista_GrupoWhatsapp_ID } = req.body;

        // Validação
        if (!mensagem_de_texto || !marcado_para || !criado_em || !foi_enviado || !enviado_em || !Lojista_ID || !Lojista_GrupoWhatsapp_ID) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                message: 'Todos os dados são obrigatórios'
            });
        }

        // Atualiza
        const [result] = await db.query(
            'UPDATE Mensagens SET mensagem_de_texto = ?, marcado_para = ?, criado_em = ?, foi_enviado? = ?, enviado_em = ?, Lojista_ID = ?, `Lojista_Grupo Whatsapp_ID` = ? WHERE ID = ?',
            [mensagem_de_texto, marcado_para, criado_em, foi_enviado, enviado_em, Lojista_ID, Lojista_GrupoWhatsapp_ID, id_mensagem]
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
            id_mensagem,
            mensagem_de_texto,
            marcado_para,
            criado_em,
            foi_enviado,
            Lojista_ID,
            Lojista_GrupoWhatsapp_ID
        });

    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ 
            error: 'Erro ao atualizar Mensagem',
            details: err.message 
        });
    }
  },

  async listar(res) {
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
        const { id_mensagem } = req.params;

        // Verificando se existe
        const [campanha] = await db.query(
            'SELECT ID FROM Mensagens WHERE ID = ? LIMIT 1',
            [id_mensagem]
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
            [id_mensagem]
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
            id_mensagem
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