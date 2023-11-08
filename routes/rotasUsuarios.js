const { Router } = require('express');

const { getUsuarios, addUsuario, updateUsuario, deleteUsuario, getUsuarioPorCodigo } = require('../controllers/usuarioController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasUsuarios = new Router();

rotasUsuarios.route('/usuario')
    .get(verificaJWT, getUsuarios)
    .put(verificaJWT, updateUsuario)
    .post(addUsuario)

rotasUsuarios.route('/usuario/:codigo')
    .get(verificaJWT, getUsuarioPorCodigo)
    .delete(verificaJWT, deleteUsuario)

module.exports = { rotasUsuarios };