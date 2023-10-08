class Usuario {
    constructor(codigo, email, tipo, nome) {
        this.codigo = codigo;
        this.email = email;
        this.nome = nome;
        this.tipo = tipo;
    }
}

module.exports = Usuario;