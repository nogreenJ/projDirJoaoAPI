const { Router } = require('express');

const { rotasDiretorios } = require('./rotasDiretorios');
const { rotasUsuarios } = require('./rotasUsuarios');

const { login } = require('../controllers/segurancaController');
const { addUsuario } = require('../controllers/usuarioController');

const rotas = new Router();

// rota para o login
rotas.route('/login').post(login);

rotasUsuarios.route('/cadastro').post(addUsuario);

rotas.use(rotasDiretorios);
rotas.use(rotasUsuarios);

module.exports = rotas;
