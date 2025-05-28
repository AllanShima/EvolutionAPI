const express = require('express');
const router = express.Router();
const gruposWhatsController = require('../controllers/gruposWhatsController');

// Rotas para Campanhas
router.post('/', gruposWhatsController.criar);
router.get('/', gruposWhatsController.listar);
// router.get('/:id', gruposWhatsController.obterPorID);
router.patch('/:id', gruposWhatsController.atualizar);
router.delete('/:id', gruposWhatsController.deletar);

module.exports = router;