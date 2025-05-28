const express = require('express');
const router = express.Router();
const campanhasHasUsuariosController = require('../controllers/campanhasHasUsuariosController');

// Rotas para Campanhas
router.post('/', campanhasHasUsuariosController.criar);
router.get('/', campanhasHasUsuariosController.listar);
// router.get('/:id', campanhasHasUsuariosController.obterPorID);
router.patch('/:id', campanhasHasUsuariosController.atualizar);
router.delete('/:id', campanhasHasUsuariosController.deletar);

module.exports = router;