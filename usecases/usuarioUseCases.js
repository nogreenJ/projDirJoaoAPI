const { pool } = require('../config');
const Usuario = require('../entities/usuario');

const getUsuariosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM usuarios ORDER BY codigo`);
        return rows.map((usuario) => new Usuario(usuario.codigo, usuario.email, usuario.nome));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addUsuarioDB = async (body) => {
    try {
        const { nome, email, senha } = body;
        if (!nome || !email || !senha) {
            return { msg: "ERRO: dados faltando", status: 'error' };
        }
        const results = await pool.query(`INSERT INTO usuarios (nome, email, senha) 
            VALUES ($1, $2, $3)
            returning codigo, nome, email`,
            [nome, email, senha])
        const usuario = results.rows[0];
        return { msg: "Usuário cadastrado", obj: new Usuario(usuario.codigo, usuario.email, usuario.nome), status: 'success' };
    } catch (err) {
        throw "Erro ao inserir o usuario: " + err;
    }
}


const updateUsuarioDB = async (body) => {
    try {
        const { codigo, nome, senha, novaSenha } = body;
        let updateFields = "";
        if(nome){
            updateFields += "nome = $2";
        }
        if(novaSenha){
            if(updateFields) updateFields += ", ";
            updateFields += "senha = $4";
        }
        if(!updateFields){
            return getUsuarioPorCodigoDB(codigo);
        }
        const results = await pool.query(`UPDATE usuarios set ` + updateFields + ` where codigo = $1 and senha = $3 
        returning codigo, nome, email`,
            [codigo, nome, senha, novaSenha]);
        if (results.rowCount == 0) {
            throw `Os dados informados estão incorretos`;
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.codigo, usuario.email, usuario.nome);
    } catch (err) {
        throw "Erro ao alterar a usuario: " + err;
    }
}

const deleteUsuarioDB = async (codigo) => {
    try {
        await pool.query(`DELETE FROM diretorios where usuario = $1`, [codigo]);
        const results = await pool.query(`DELETE FROM usuarios where codigo = $1;`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Usuario removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o usuario: " + err;
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
            return new Usuario(usuario.codigo, usuario.email, usuario.nome);
        }
    } catch (err) {
        throw "Erro ao recuperar o usuario: " + err;
    }
}

module.exports = {
    getUsuariosDB, addUsuarioDB, updateUsuarioDB, deleteUsuarioDB, getUsuarioPorCodigoDB
}
