const { Router } = require('express');

const { getArquivos, addArquivo, updateArquivo, deleteArquivo, getArquivoPorCodigo } = require('../controllers/arquivoController');

const { verificaJWT } = require('../controllers/segurancaController');
const rotasArquivos = new Router();

rotasArquivos.route('/arquivo')
    .get(verificaJWT, getArquivos)
    .post(verificaJWT, addArquivo)
    .put(verificaJWT, updateArquivo)

rotasArquivos.route('/arquivo/:codigo')
    .get(verificaJWT, getArquivoPorCodigo)
    .delete(verificaJWT, deleteArquivo)

module.exports = { rotasArquivos };
