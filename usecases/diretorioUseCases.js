const { pool } = require('../config');
const Diretorio = require('../entities/diretorio');

const getDiretoriosDB = async (codigo) => {
    try {
        if (codigo) {
            const { rows } = await pool.query(`SELECT * FROM diretorios where usuario = $1 ORDER BY codigo`, [codigo]);
            return rows.map((diretorio) => new Diretorio(diretorio.codigo, diretorio.nome, (diretorio.parent ? diretorio.parent : '')));
        } else {
            const { rows } = await pool.query(`SELECT * FROM diretorios ORDER BY codigo`);
            return rows.map((diretorio) => new Diretorio(diretorio.codigo, diretorio.nome, (diretorio.parent ? diretorio.parent : '')));
        }
    } catch (err) {
        throw "Erro: " + err;
    }
}

const getDiretoriosArquivosDB = async (codigo) => {
    try {
        let rowsDir, rowsArq;
        if (codigo) {
            rowsDir = await pool.query(`SELECT * FROM diretorios where usuario = $1 ORDER BY codigo`, [codigo]);
            rowsArq = await pool.query(`SELECT * FROM arquivos where dono = $1 ORDER BY codigo`, [codigo]);
            rowsDir = rows.map((diretorio) => new Diretorio(diretorio.codigo, diretorio.nome, (diretorio.parent ? diretorio.parent : '')));
            rowsArq = rows.map((arquivo) => new Arquivo(arquivo.codigo, arquivo.nome, arquivo.formato, (arquivo.parent ? arquivo.parent : ''), arquivo.dono, arquivo.criptografia, arquivo.cid));
        } else {
            rowsDir = await pool.query(`SELECT * FROM diretorios ORDER BY codigo`);
            rowsArq = await pool.query(`SELECT * FROM arquivos ORDER BY codigo`);
            rowsDir = rows.map((diretorio) => new Diretorio(diretorio.codigo, diretorio.nome, (diretorio.parent ? diretorio.parent : '')));
            rowsArq = rows.map((arquivo) => new Arquivo(arquivo.codigo, arquivo.nome, arquivo.formato, (arquivo.parent ? arquivo.parent : ''), arquivo.dono, arquivo.criptografia, arquivo.cid));
        }
        return rowsDir.concat(rowsArq);
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addDiretorioDB = async (body) => {
    try {
        const { nome, usuario, parent } = body;
        const results = await pool.query(`INSERT INTO diretorios (nome, usuario, parent) 
            VALUES ($1, $2, $3) returning codigo, nome, parent`,
            [nome, usuario, (parent ? parent : null)]);
        const diretorio = results.rows[0];
        return new Diretorio(diretorio.codigo, diretorio.nome, (diretorio.parent ? diretorio.parent : ''));
    } catch (err) {
        throw "Erro ao inserir o diretorio: " + err;
    }
}

const updateDiretorioDB = async (body) => {
    try {
        const { codigo, nome, parent } = body;
        const results = await pool.query(`UPDATE diretorios set nome = $2, parent = $3 where codigo = $1 
        returning codigo, nome, parent, usuario`,
            [codigo, nome, (parent ? parent : null)]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const diretorio = results.rows[0];
        return new Diretorio(diretorio.codigo, diretorio.nome, (diretorio.parent ? diretorio.parent : null));
    } catch (err) {
        throw "Erro ao alterar o diretorio: " + err;
    }
}

const deleteDiretorioDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM diretorios where codigo = $1 ORDER BY codigo`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            await pool.query(`UPDATE arquivos set parent = $2 where parent = $1`, [codigo, results[0].parent).then(async () =>
                await pool.query(`DELETE FROM diretorios where codigo = $1 `, [codigo])
            );
            return "Diretorio removido com sucesso";
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
            return new Diretorio(diretorio.codigo, diretorio.nome, (diretorio.parent ? diretorio.parent : ''));
        }
    } catch (err) {
        throw "Erro ao recuperar a diretorio: " + err;
    }
}

module.exports = {
    getDiretoriosDB, addDiretorioDB, updateDiretorioDB, deleteDiretorioDB, getDiretorioPorCodigoDB
}
