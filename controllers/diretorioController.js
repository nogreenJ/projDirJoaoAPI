const { getDiretoriosDB, getDiretoriosByUserDB, addDiretorioDB, getDiretoriosArquivosDB,
    updateDiretorioDB, deleteDiretorioDB, getDiretorioPorCodigoDB }
    = require('../usecases/diretorioUseCases')

const getDiretorios = async (request, response) => {
    await getDiretoriosDB((request.usuario.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400));
}

const addDiretorio = async (request, response) => {
    await addDiretorioDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Diretório criado",
            objeto: data
        }))
        .catch(err => response.status(400));
}

const updateDiretorio = async (request, response) => {
    await updateDiretorioDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Diretorio alterado",
            objeto: data
        }))
        .catch(err => response.status(400));
}

const deleteDiretorio = async (request, response) => {
    await deleteDiretorioDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400));
}

const getDiretorioPorCodigo = async (request, response) => {
    await getDiretorioPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400));
}

const getDiretoriosArquivos = async (request, response) => {
    if(!request.usuario){
        response.status(400).json({
            status: 'error',
            message: 'Sem usuário informado'
        })
    } else {
        const diretorios = await getDiretoriosArquivosDB((request.usuario.codigo))
            .then(data => response.status(200).json(data))
            .catch(err => response.status(400));
    }
}

module.exports = {
    getDiretorios, addDiretorio, updateDiretorio, deleteDiretorio, getDiretorioPorCodigo, getDiretoriosArquivos
}
