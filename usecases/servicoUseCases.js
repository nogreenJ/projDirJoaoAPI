const { pool } = require('../config');
const Servico = require('../entities/servico');

const getServicosDB = async (codigo) => {
    try {
        if (codigo) {
            const { rows } = await pool.query(`SELECT * FROM servicos where dono = $1 ORDER BY codigo`, [codigo]);
            return rows.map((servico) => new Servico(servico.codigo, servico.nome, servico.endpoint, servico.key, servico.usuario));
        } else {
            const { rows } = await pool.query(`SELECT * FROM servicos ORDER BY codigo`);
            return rows.map((servico) => new Servico(servico.codigo, servico.nome, servico.endpoint, servico.key, servico.usuario);
        }
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addServicoDB = async (body) => {
    try {
        const { nome, endpoint, key, usuario } = body;
        const results = await pool.query(`INSERT INTO servicos (nome, endpoint, key, usuario) 
            VALUES ($1, $2, $3, $4) returning codigo, nome, endpoint, key, usuario`,
            [nome, endpoint, key, usuario]);
        const servico = results.rows[0];
        return new Servico(servico.codigo, servico.nome, servico.endpoint, servico.key, servico.usuario);
    } catch (err) {
        throw "Erro ao inserir o servico: " + err;
    }
}

const updateServicoDB = async (body) => {
    try {
        const { codigo, nome, parent } = body;
        const results = await pool.query(`UPDATE servicos set nome = $2 where codigo = $1 
        returning codigo, nome, endpoint, key, usuario`,
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
            return new Servico(servico.codigo, servico.nome, servico.endpoint, servico.key, servico.usuario);
        }
    } catch (err) {
        throw "Erro ao recuperar o servico: " + err;
    }
}

module.exports = {
    getServicosDB, addServicoDB, updateServicoDB, deleteServicoDB, getServicoPorCodigoDB
}
