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
        const { nome, email, senha, sc_key } = body;
        if (!nome || !email || !senha || !sc_key) {
            return { msg: "ERRO: dados faltando", status: 'error' };
        }
        const notvalid = await getUsuarioPorEmail(email);
        if(notvalid){
            return { msg: "Email já cadastrado no sistema.", status: 'warning' };
        }
        const results = await pool.query(`INSERT INTO usuarios (nome, email, senha, sc_key) 
            VALUES ($1, $2, $3, $4) returning codigo, nome, email, sc_key`,
            [nome, email, senha, sc_key]);
        const usuario = results.rows[0];
        return { msg: "Usuário cadastrado", obj: new Usuario(usuario.codigo, usuario.email, usuario.nome, usuario.sc_key), status: 'success' };
    } catch (err) {
        throw "Erro ao inserir o usuario: " + err;
    }
}

const getUsuarioPorEmail = async (email) => {
    try {
        const results = await pool.query(`SELECT * FROM usuarios where email = $1`, [email]);
        if (results.rowCount == 0) {
            return null;
        } else {
            const usuario = results.rows[0];
            return new Usuario(usuario.codigo, usuario.email, usuario.nome);
        }
    } catch (err) {
        throw "Erro ao consultar o usuario: " + err;
    }
}


const updateUsuarioDB = async (body) => {
    try {
        const { codigo, nome, senha, novaSenha, sc_key } = body;
        let updateFields = null;
        let params = [codigo, senha];
        if(nome){
            updateFields = "nome = $3";
            params.push(nome);
        }
        if(novaSenha){
            if(updateFields) {
                updateFields += ", ";
            } else {
                updateFields = "";
            }
            updateFields += "senha = $" + (params.length+1) +", sc_key = $" + (params.length+2);
            params.push(novaSenha);
            params.push(sc_key);
        }
        if(!updateFields){
            return getUsuarioPorCodigoDB(codigo);
        }
        const results = await pool.query(`UPDATE usuarios set ` + updateFields + ` where codigo = $1 and senha = $2 
        returning codigo, nome, email, sc_key`, params);
        if (results.rowCount == 0) {
            throw `A senha informada está incorreta`;
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.codigo, usuario.email, usuario.nome, usuario.sc_key);
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
