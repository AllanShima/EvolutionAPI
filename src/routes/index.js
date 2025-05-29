const express = require('express');
const router = express.Router();

// Importa todas as rotas
const campanhasRoutes = require('./campanhasRoutes');
const usuariosRoutes = require('./usuariosRoutes');
const campanhasHasUsuariosRoutes = require('./campanhasHasUsuariosRoutes');

const gruposWhatsRoutes = require('./gruposWhatsRoutes');
const lojistasRoutes = require('./lojistasRoutes');
const mensagensRoutes = require('./mensagensRoutes');

// Prefixos para APIs
router.use('/campanhas', campanhasRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/campanhashasusuarios', campanhasHasUsuariosRoutes);

router.use('/gruposwhats', gruposWhatsRoutes);
router.use('/lojistas', lojistasRoutes);
router.use('/mensagens', mensagensRoutes);

module.exports = router;