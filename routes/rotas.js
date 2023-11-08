const { Router } = require('express');

const { rotasDiretorios } = require('./rotasDiretorios');
const { rotasUsuarios } = require('./rotasUsuarios');

const { login } = require('../controllers/segurancaController');
const { addUsuarioDB } = require('../usecases/usuarioUseCases');

const rotas = new Router();

// rota para o login
rotas.route('/login').post(login);
rotas.route('/cadastro').post(addUsuarioDB);

rotas.use(rotasDiretorios);
rotas.use(rotasUsuarios);

module.exports = rotas;