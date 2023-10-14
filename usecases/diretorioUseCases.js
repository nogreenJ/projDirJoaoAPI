const { pool } = require('../config');
const Diretorio = require('../entities/diretorio');

const getDiretoriosDB = async (codigo) => {
    try {
        if (codigo) {
            console.log('lol ' + codigo)
            const { rows } = await pool.query(`SELECT * FROM diretorios where usuario = $1 ORDER BY parent, codigo`, [codigo]);
            return rows.map((diretorio) => new Diretorio(diretorio.codigo, diretorio.nome, diretorio.parent ));
        } else {
            const { rows } = await pool.query(`SELECT * FROM diretorios ORDER BY parent, codigo`);
            return rows.map((diretorio) => new Diretorio(diretorio.codigo, diretorio.nome, diretorio.parent));
        }
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addDiretorioDB = async (body) => {
    try {
        const { nome, usuario, parent } = body;
        const results = await pool.query(`INSERT INTO diretorios (nome, usuario, parent) 
            VALUES ($1, $2, $3)
            returning codigo, nome`,
            [nome, usuario, (parent ? parent : null)]);
        const diretorio = results.rows[0];
        return new Diretorio(diretorio.codigo, diretorio.nome);
    } catch (err) {
        throw "Erro ao inserir a diretorio: " + err;
    }
}

const updateDiretorioDB = async (body) => {
    try {
        const { codigo, nome, parent } = body;
        const results = await pool.query(`UPDATE diretorios set nome = $2, parent = $3 where codigo = $1 
        returning codigo, nome, parent, usuario`,
            [codigo, nome, parent]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const diretorio = results.rows[0];
        return new Diretorio(diretorio.codigo, diretorio.nome, (diretorio.parent ? diretorio.parent : null));
    } catch (err) {
        throw "Erro ao alterar a diretorio: " + err;
    }
}

const deleteDiretorioDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM diretorios where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Diretorio removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a diretorio: " + err;
    }
}

const getDiretorioPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM diretorios where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const diretorio = results.rows[0];
            return new Diretorio(diretorio.codigo, diretorio.nome, (diretorio.parent ? diretorio.parent : null));
        }
    } catch (err) {
        throw "Erro ao recuperar a diretorio: " + err;
    }
}

module.exports = {
    getDiretoriosDB, addDiretorioDB, updateDiretorioDB, deleteDiretorioDB, getDiretorioPorCodigoDB
}
