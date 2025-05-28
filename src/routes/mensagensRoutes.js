const express = require('express');
const router = express.Router();
const mensagensController = require('../controllers/mensagensController');

// Rotas para Campanhas
router.post('/', mensagensController.criar);
router.get('/', mensagensController.listar);
// router.get('/:id', mensagensController.obterPorID);
router.patch('/:id', mensagensController.atualizar);
router.delete('/:id', mensagensController.deletar);

module.exports = router;