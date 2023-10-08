const { Router } = require('express');

const { getUsuarios, addUsuario, updateUsuario, deleteUsuario, getUsuarioPorCodigo } = require('../controllers/usuarioController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasUsuarios = new Router();

rotasUsuarios.route('/usuario')
    .get(verificaJWT, getUsuarios)
    .post(verificaJWT, addUsuario)
    .put(verificaJWT, updateUsuario)

rotasUsuarios.route('/usuario/:codigo')
    .get(verificaJWT, getUsuarioPorCodigo)
    .delete(verificaJWT, deleteUsuario)

module.exports = { rotasUsuarios };