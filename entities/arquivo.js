class Arquivo {
    constructor(codigo, nome, formato, parent, dono, criptografia, cid, servico) {
        this.codigo = codigo;
        this.nome = nome;
        this.formato = formato;
        this.parent = parent;
        this.dono = dono;
        this.criptografia = criptografia;
        this.cid = cid;
        this.servico = servico;
    }
}

module.exports = Arquivo;
