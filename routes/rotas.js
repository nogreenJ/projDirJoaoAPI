const { Router } = require('express');

const { rotasDiretorios } = require('./rotasDiretorios');
const { rotasArquivos } = require('./rotasArquivos');
const { rotasServicos } = require('./rotasServicos');
const { rotasUsuarios } = require('./rotasUsuarios');

const { login } = require('../controllers/segurancaController');
const { addUsuario } = require('../controllers/usuarioController');

const rotas = new Router();

// rota para o login
rotas.route('/login').post(login);

rotasUsuarios.route('/cadastro').post(addUsuario);

rotas.use(rotasDiretorios);
rotas.use(rotasArquivos);
rotas.use(rotasServicos);
rotas.use(rotasUsuarios);

module.exports = rotas;
