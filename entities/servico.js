class Servico {
    constructor(codigo, nome, key, usuario, tipo, sc_key) {
        this.codigo = codigo;
        this.nome = nome;
        this.key = key;
        this.usuario = usuario;
        this.tipo = tipo;
        this.sc_key = sc_key;
    }
}

module.exports = Servico;
