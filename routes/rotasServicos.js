const { Router } = require('express');

const { getServicos, addServico, updateServico, deleteServico, getServicoPorCodigo, getServicosArquivos } = require('../controllers/servicoController');

const { verificaJWT } = require('../controllers/segurancaController');
const rotasServicos = new Router();

rotasServicos.route('/servico')
    .post(verificaJWT, addServico)
    .put(verificaJWT, updateServico)

rotasServicos.route('/servico/:codigo')
    .get(verificaJWT, getServicos)
    .delete(verificaJWT, deleteServico)

rotasServicos.route('/servico/edt/:codigo')
    .get(verificaJWT, getServicoPorCodigo)

module.exports = { rotasServicos };
