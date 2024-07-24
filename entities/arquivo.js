class Arquivo {
    constructor(codigo, nome, formato, parent, dono, cid, servico, servicoTipo) {
        this.codigo = codigo;
        this.nome = nome;
        this.formato = formato;
        this.parent = parent;
        this.dono = dono;
        this.cid = cid;
        this.servico = servico;
        this.servicoTipo = servicoTipo;
    }
}

module.exports = Arquivo;
