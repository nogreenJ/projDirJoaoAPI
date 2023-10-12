const { Router } = require('express');

const { getDiretorios, getDiretoriosByUser, addDiretorio, updateDiretorio, deleteDiretorio, getDiretorioPorCodigo } = require('../controllers/diretorioController');

const { verificaJWT } = require('../controllers/segurancaController');
const rotasDiretorios = new Router();

rotasDiretorios.route('/diretorio')
    .get(verificaJWT, getDiretorios)
    .post(verificaJWT, addDiretorio)
    .put(verificaJWT, updateDiretorio)

rotasDiretorios.route('/diretorio/:user')
    .get(verificaJWT, getDiretoriosByUser)

rotasDiretorios.route('/diretorio/:codigo')
    .get(verificaJWT, getDiretorioPorCodigo)
    .delete(verificaJWT, deleteDiretorio)

module.exports = { rotasDiretorios };
