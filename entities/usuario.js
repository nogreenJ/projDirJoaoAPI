class Usuario {
    constructor(codigo, email, tipo, nome, senha) {
        this.codigo = codigo;
        this.email = email;
        this.nome = nome;
        this.tipo = tipo;
        this.senha = senha;
    }
}

module.exports = Usuario;
