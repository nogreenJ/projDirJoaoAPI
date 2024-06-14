const { pool } = require('../config');
const Servico = require('../entities/servico');

const getServicosDB = async (codigo) => {
    try {
        if (codigo) {
            const { rows } = await pool.query(`SELECT * FROM servicos where usuario = $1 ORDER BY codigo`, [codigo]);
            return rows.map((servico) => new Servico(servico.codigo, servico.nome, servico.key, servico.usuario, servico.tipo, servico.sc_key));
        }
        throw new Error('Usuário não informado!');
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addServicoDB = async (body) => {
    try {
        const { nome, key, usuario, tipo, sc_key } = body;
        const results = await pool.query(`INSERT INTO servicos (nome, key, usuario, tipo, sc_key) 
            VALUES ($1, $2, $3, $4, $5) returning codigo, nome, key, usuario, tipo, sc_key`,
            [nome, key, usuario, tipo, sc_key]);
        const servico = results.rows[0];
        return new Servico(servico.codigo, servico.nome, servico.key, servico.usuario, servico.tipo, servico.sc_key);
    } catch (err) {
        throw "Erro ao inserir o servico: " + err;
    }
}

const updateServicoDB = async (body) => {
    try {
        const { codigo, nome, parent, sc_key } = body;
        let updateFields = "";
        if(sc_key){
            updateFields += ", sc_key = $3";
        }
        const results = await pool.query(`UPDATE servicos set nome = $2 ` + updateFields + ` where codigo = $1 
        returning codigo, nome, key, usuario, tipo, sc_key`,
            [codigo, nome, sc_key]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const servico = results.rows[0];
        return new Servico(servico.codigo, servico.nome, servico.key, servico.usuario, servico.sc_key);
    } catch (err) {
        throw "Erro ao alterar o servico: " + err;
    }
}

const deleteServicoDB = async (codigo) => {
    try {
        //TODO: checar se há arquivos que usam esse serviço
        const results = await pool.query(`DELETE FROM servicos where codigo = $1 `, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Servico removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o servico: " + err;
    }
}

const getServicoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM servicos where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const servico = results.rows[0];
            return new Servico(servico.codigo, servico.nome, servico.key, servico.usuario, servico.tipo, servico.sc_key);
        }
    } catch (err) {
        throw "Erro ao recuperar o servico: " + err;
    }
}

module.exports = {
    getServicosDB, addServicoDB, updateServicoDB, deleteServicoDB, getServicoPorCodigoDB
}
