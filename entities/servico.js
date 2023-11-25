class Servico {
    constructor(codigo, nome, endpoint, key, usuario) {
        this.codigo = codigo;
        this.nome = nome;
        this.endpoint = endpoint;
        this.key = key;
        this.usuario = usuario;
    }
}

module.exports = Servico;
