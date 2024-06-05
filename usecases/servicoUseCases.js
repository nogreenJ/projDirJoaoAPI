const { pool } = require('../config');
const Servico = require('../entities/servico');

const getServicosDB = async (codigo) => {
    try {
        if (codigo) {
            const { rows } = await pool.query(`SELECT * FROM servicos where usuario = $1 ORDER BY codigo`, [codigo]);
            return rows.map((servico) => new Servico(servico.codigo, servico.nome, servico.endpoint, servico.key, servico.usuario, servico.tipo));
        }
        throw new Error('Usuário não informado!');
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addServicoDB = async (body) => {
    try {
        const { nome, endpoint, key, usuario, tipo } = body;
        const results = await pool.query(`INSERT INTO servicos (nome, endpoint, key, usuario, tipo) 
            VALUES ($1, $2, $3, $4, $5) returning codigo, nome, endpoint, key, usuario, tipo`,
            [nome, endpoint, key, usuario, tipo]);
        const servico = results.rows[0];
        return new Servico(servico.codigo, servico.nome, servico.endpoint, servico.key, servico.usuario, servico.tipo);
    } catch (err) {
        throw "Erro ao inserir o servico: " + err;
    }
}

const updateServicoDB = async (body) => {
    try {
        const { codigo, nome, parent } = body;
        const results = await pool.query(`UPDATE servicos set nome = $2 where codigo = $1 
        returning codigo, nome, endpoint, key, usuario, tipo`,
            [codigo, nome]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const servico = results.rows[0];
        return new Servico(servico.codigo, servico.nome, servico.endpoint, servico.key, servico.usuario);
    } catch (err) {
        throw "Erro ao alterar o servico: " + err;
    }
}

const deleteServicoDB = async (codigo) => {
    try {
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
            return new Servico(servico.codigo, servico.nome, servico.endpoint, servico.key, servico.usuario, servico.tipo);
        }
    } catch (err) {
        throw "Erro ao recuperar o servico: " + err;
    }
}

module.exports = {
    getServicosDB, addServicoDB, updateServicoDB, deleteServicoDB, getServicoPorCodigoDB
}
