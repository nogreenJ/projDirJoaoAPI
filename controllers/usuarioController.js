const { getUsuariosDB, addUsuarioDB,
    updateUsuarioDB, deleteUsuarioDB, getUsuarioPorCodigoDB }
    = require('../usecases/usuarioUseCases')

const getUsuarios = async (request, response) => {
    await getUsuariosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400));
}

const addUsuario = async (request, response) => {
    await addUsuarioDB(request.body)
        .then(data => response.status(200).json({
            status: data.status,
            message: data.msg,
            objeto: data.obj
        }))
        .catch(err => response.status(400));
}

const updateUsuario = async (request, response) => {
    await updateUsuarioDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Usuario alterado",
            objeto: data
        }))
        .catch(err => response.status(400));
}

const deleteUsuario = async (request, response) => {
    await deleteUsuarioDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400));
}

const getUsuarioPorCodigo = async (request, response) => {
    await getUsuarioPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400));
}

module.exports = {
    getUsuarios, addUsuario, updateUsuario, deleteUsuario, getUsuarioPorCodigo
}