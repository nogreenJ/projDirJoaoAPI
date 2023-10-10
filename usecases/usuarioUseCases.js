const { pool } = require('../config');
const Usuario = require('../entities/usuario');

const getUsuariosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM usuarios ORDER BY codigo`);
        return rows.map((usuario) => new Usuario(usuario.codigo, usuario.email, usuario.tipo, usuario.nome));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addUsuarioDB = async (body) => {
    try {
        const { nome, email, tipo, senha } = body;
        const results = await pool.query(`INSERT INTO usuarios (nome, email, tipo, senha) 
            VALUES ($1)
            returning codigo, nome, email, tipo`,
            [nome, email, tipo, senha]);
        const usuario = results.rows[0];
        return new Usuario(usuario.codigo, usuario.email, usuario.tipo, usuario.nome);
    } catch (err) {
        throw "Erro ao inserir a usuario: " + err;
    }
}


const updateUsuarioDB = async (body) => {
    try {
        const { codigo, nome } = body;
        const results = await pool.query(`UPDATE usuarios set nome = $2 where codigo = $1 
        returning codigo, nome, tipo, email`,
            [codigo, nome]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.codigo, usuario.email, usuario.tipo, usuario.nome);
    } catch (err) {
        throw "Erro ao alterar a usuario: " + err;
    }
}

const deleteUsuarioDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM usuarios where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Usuario removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a usuario: " + err;
    }
}

const getUsuarioPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM usuarios where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const usuario = results.rows[0];
            return new Usuario(usuario.codigo, usuario.email, usuario.tipo, usuario.nome, usuario.senha);
        }
    } catch (err) {
        throw "Erro ao recuperar a usuario: " + err;
    }
}

module.exports = {
    getUsuariosDB, addUsuarioDB, updateUsuarioDB, deleteUsuarioDB, getUsuarioPorCodigoDB
}
