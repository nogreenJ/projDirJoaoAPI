const { getArquivosDB, getArquivosByUserDB, addArquivoDB,
    updateArquivoDB, deleteArquivoDB, getArquivoPorCodigoDB }
    = require('../usecases/arquivoUseCases')

const getArquivos = async (request, response) => {
    await getArquivosDB(parseInt(request.usuario.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os Arquivos: ' + err
        }))
}

const addArquivo = async (request, response) => {
    await addArquivoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Arquivo criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateArquivo = async (request, response) => {
    await updateArquivoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Arquivo alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteArquivo = async (request, response) => {
    await deleteArquivoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getArquivoPorCodigo = async (request, response) => {
    await getArquivoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getArquivos, addArquivo, updateArquivo, deleteArquivo, getArquivoPorCodigo
}
