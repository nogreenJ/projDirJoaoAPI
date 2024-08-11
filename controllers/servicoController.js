const { getServicosDB, addServicoDB,
    updateServicoDB, deleteServicoDB, getServicoPorCodigoDB }
    = require('../usecases/servicoUseCases')

const getServicos = async (request, response) => {
    await getServicosDB(parseInt(request.usuario.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400));
}

const addServico = async (request, response) => {
    await addServicoDB(request.body)
        .then(data => response.status(200).json({
            status: data.status,
            message: data.msg,
            objeto: data.obj
        }))
        .catch(err => response.status(400));
}

const updateServico = async (request, response) => {
    await updateServicoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Servico alterado",
            objeto: data
        }))
        .catch(err => response.status(400));
}

const deleteServico = async (request, response) => {
    await deleteServicoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400));
}

const getServicoPorCodigo = async (request, response) => {
    await getServicoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400));
}

module.exports = {
    getServicos, addServico, updateServico, deleteServico, getServicoPorCodigo
}
