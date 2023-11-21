const { Router } = require('express');

const { getDiretorios, addDiretorio, updateDiretorio, deleteDiretorio, getDiretorioPorCodigo, getDiretoriosArquivos } = require('../controllers/diretorioController');

const { verificaJWT } = require('../controllers/segurancaController');
const rotasDiretorios = new Router();

rotasDiretorios.route('/diretorio')
    .get(verificaJWT, getDiretorios)
    .post(verificaJWT, addDiretorio)
    .put(verificaJWT, updateDiretorio)

rotasDiretorios.route('/diretorio/:codigo')
    .get(verificaJWT, getDiretorioPorCodigo)
    .delete(verificaJWT, deleteDiretorio)

rotasDiretorios.route('/dirarquivos')
    .get(verificaJWT, getDiretoriosArquivos)

module.exports = { rotasDiretorios };
