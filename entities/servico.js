class Servico {
    constructor(codigo, nome, endpoint, key, usuario, tipo) {
        this.codigo = codigo;
        this.nome = nome;
        this.endpoint = endpoint;
        this.key = key;
        this.usuario = usuario;
        this.tipo = tipo;
    }
}

module.exports = Servico;
