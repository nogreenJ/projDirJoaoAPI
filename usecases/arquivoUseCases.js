const { pool } = require('../config');
const Arquivo = require('../entities/arquivo');

const getArquivosDB = async (codigo) => {
    try {
        if (codigo) {
            const { rows } = await pool.query(`SELECT * FROM arquivos where dono = $1 ORDER BY codigo`, [codigo]);
            return rows.map((arquivo) => new Arquivo(arquivo.codigo, arquivo.nome, arquivo.formato, (arquivo.parent ? arquivo.parent : ''), arquivo.dono, arquivo.criptografia, arquivo.cid));
        } else {
            const { rows } = await pool.query(`SELECT * FROM arquivos ORDER BY codigo`);
            return rows.map((arquivo) => new Arquivo((arquivo.codigo, arquivo.nome, arquivo.formato, (arquivo.parent ? arquivo.parent : ''), arquivo.dono, arquivo.criptografia, arquivo.cid));
        }
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addArquivoDB = async (body) => {
    try {
        const { nome, usuario, parent } = body;
        const results = await pool.query(`INSERT INTO arquivos (codigo, nome, formato, parent, dono, criptografia, cid) 
            VALUES ($1, $2, $3) returning codigo, nome, formato, parent, dono, criptografia, cid`,
            [nome, usuario, (parent ? parent : null)]);
        const arquivo = results.rows[0];
        return new Arquivo(arquivo.codigo, arquivo.nome, arquivo.formato, (arquivo.parent ? arquivo.parent : ''), arquivo.dono, arquivo.criptografia, arquivo.cid);
    } catch (err) {
        throw "Erro ao inserir o arquivo: " + err;
    }
}

const updateArquivoDB = async (body) => {
    try {
        const { codigo, nome, parent } = body;
        const results = await pool.query(`UPDATE arquivos set nome = $2, parent = $3 where codigo = $1 
        returning codigo, nome, formato, parent, dono, criptografia, cid`,
            [codigo, nome, (parent ? parent : null)]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const arquivo = results.rows[0];
        return new Arquivo(arquivo.codigo, arquivo.nome, arquivo.formato, (arquivo.parent ? arquivo.parent : ''), arquivo.dono, arquivo.criptografia, arquivo.cid);
    } catch (err) {
        throw "Erro ao alterar o arquivo: " + err;
    }
}

const deleteArquivoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM arquivos where codigo = $1 `, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Arquivo removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o arquivo: " + err;
    }
}

const getArquivoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM arquivos where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const arquivo = results.rows[0];
            return new Arquivo(arquivo.codigo, arquivo.nome, arquivo.formato, (arquivo.parent ? arquivo.parent : ''), arquivo.dono, arquivo.criptografia, arquivo.cid);
        }
    } catch (err) {
        throw "Erro ao recuperar o arquivo: " + err;
    }
}

module.exports = {
    getArquivosDB, addArquivoDB, updateArquivoDB, deleteArquivoDB, getArquivoPorCodigoDB
}