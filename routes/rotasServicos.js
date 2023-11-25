const { Router } = require('express');

const { getServicos, addServico, updateServico, deleteServico, getServicoPorCodigo, getServicosArquivos } = require('../controllers/servicoController');

const { verificaJWT } = require('../controllers/segurancaController');
const rotasServicos = new Router();

rotasServicos.route('/servico')
    .get(verificaJWT, getServicos)
    .post(verificaJWT, addServico)
    .put(verificaJWT, updateServico)

rotasServicos.route('/servico/:codigo')
    .get(verificaJWT, getServicoPorCodigo)
    .delete(verificaJWT, deleteServico)

module.exports = { rotasServicos };
