const express = require('express');
const router = express.Router();
const campanhasController = require('../controllers/campanhasController');

// Rotas para Campanhas
router.post('/', campanhasController.criar);
router.get('/', campanhasController.listar);
// router.get('/:id', campanhasController.obterPorID);
router.patch('/:id', campanhasController.atualizar);
router.delete('/:id', campanhasController.deletar);

module.exports = router;