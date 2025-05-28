const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rotas para Campanhas
router.post('/', usuariosController.criar);
router.get('/', usuariosController.listar);
// router.get('/:id', usuariosController.obterPorID);
router.patch('/:id', usuariosController.atualizar);
router.delete('/:id', usuariosController.deletar);

module.exports = router;