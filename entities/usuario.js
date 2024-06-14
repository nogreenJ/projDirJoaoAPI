class Usuario {
    constructor(codigo, email, nome, sc_key, senha) {
        this.codigo = codigo;
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.sc_key = sc_key;
    }
}

module.exports = Usuario;
