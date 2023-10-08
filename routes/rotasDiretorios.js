const { Router } = require('express');

const { getDiretorios, addDiretorio, updateDiretorio, deleteDiretorio, getDiretorioPorCodigo } = require('../controllers/diretorioController');
const { getUsuarios, addUsuario, updateUsuario, deleteUsuario, getUsuarioPorCodigo } = require('../controllers/usuarioController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasDiretorios = new Router();
const rotasUsuarios = new Router();

rotasDiretorios.route('/diretorio')
    .get(verificaJWT, getDiretorios)
    .post(verificaJWT, addDiretorio)
    .put(verificaJWT, updateDiretorio)

rotasDiretorios.route('/diretorio/:codigo')
    .get(verificaJWT, getDiretorioPorCodigo)
    .delete(verificaJWT, deleteDiretorio)

rotasUsuarios.route('/usuario')
    .get(verificaJWT, getUsuarios)
    .post(verificaJWT, addUsuario)
    .put(verificaJWT, updateUsuario)

rotasUsuarios.route('/usuario/:codigo')
    .get(verificaJWT, getUsuarioPorCodigo)
    .delete(verificaJWT, deleteUsuario)

module.exports = { rotasDiretorios };
module.exports = { rotasUsuarios };