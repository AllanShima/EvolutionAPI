const express = require('express');
const router = express.Router();
const lojistasController = require('../controllers/lojistasController');

// Rotas para Campanhas
router.post('/', lojistasController.criar);
router.get('/', lojistasController.listar);
// router.get('/:id', lojistasController.obterPorID);
router.patch('/:id', lojistasController.atualizar);
router.delete('/:id', lojistasController.deletar);

module.exports = router;