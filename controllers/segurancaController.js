const { autenticaUsuarioDB } = require('../usecases/segurancaUseCases');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    await autenticaUsuarioDB(request.body)
        .then(usuario => {
            const token = jwt.sign(
                {usuario}, 
                process.env.SECRET, 
                {expiresIn: 3600}
            )
            return response.json({ auth: true, token: token, key: usuario.sc_key });
        })
        .catch(err => response.status(401));
}

function verificaJWT(request, response, next) {
    const token = request.headers['authorization'];
    if (!token) return response.status(401);
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
            response.status(401).json({
                auth: false,
                message: "Erro ao autenticar o token"
            })
        } else {
            request.usuario = decoded.usuario;
        }
        next();
    })
}

module.exports = {
    login, verificaJWT
}
