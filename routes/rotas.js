const { Router } = require('express');

const { rotasDiretorios } = require('./rotasDiretorios');
const { rotasUsuarios } = require('./rotasUsuarios');

const { login } = require('../controllers/segurancaController');

const rotas = new Router();

// rota para o login
rotas.route('/login').post(login);

rotas.use(rotasDiretorios);
rotas.use(rotasUsuarios);

module.exports = rotas;