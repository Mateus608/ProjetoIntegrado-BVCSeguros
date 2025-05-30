CREATE DATABASE bvOrcamentos;
USE bvOrcamentos;

CREATE TABLE users (
    idusers INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(100),
    nome VARCHAR(45),
    passwd VARCHAR(255),
    codigo VARCHAR(45),
    tipo INT
);

CREATE TABLE formGlobal (
    idformGlobal INT PRIMARY KEY AUTO_INCREMENT,
    codOrcamento VARCHAR(45),
    modalidade VARCHAR(45),
    cia VARCHAR(45),
    ciaGestor VARCHAR(45),
    cia1 VARCHAR(45),
    cia2 VARCHAR(45),
    cia3 VARCHAR(45),
    semLogo INT,
    tipoOrcamento VARCHAR(45),
    comercial VARCHAR(45),
    dataOrcamento VARCHAR(45),
    cliente VARCHAR(45),
    celular VARCHAR(45),
    tipoPessoa VARCHAR(45),
    ramo VARCHAR(45),
    seguradoraSecundariaGestor INT,
    seguradoraSecundariaMenorPreco INT,
    seguradoraRecomendada INT,
    is_visivelFranquias INT,
    contadorFranquias INT,
    is_visivelObservacoes INT
);

CREATE TABLE logsUser (
    idlogsUser INT PRIMARY KEY AUTO_INCREMENT,
    logMessage VARCHAR(255),
    tipo INT
);

CREATE TABLE formAuto (
    idformAuto INT PRIMARY KEY AUTO_INCREMENT,
    fabricacao INT,
    modelo INT,
    zeroKm INT,
    descricao VARCHAR(100),
    combustivel VARCHAR(15),
    placa VARCHAR(10),
    formGlobal_idformGlobal INT,
    FOREIGN KEY (formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);

CREATE TABLE coberturasAuto (
    idcoberturasAuto INT PRIMARY KEY AUTO_INCREMENT,
    cobertura VARCHAR(45),
    planoOuro VARCHAR(45),
    planoPrata VARCHAR(45),
    valor VARCHAR(45),
    formAuto_idformAuto INT,
    formAuto_formGlobal_idformGlobal INT,
    FOREIGN KEY (formAuto_idformAuto) REFERENCES formAuto(idformAuto),
    FOREIGN KEY (formAuto_formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);

CREATE TABLE coberturasAuto_Adicional (
    idcoberturasAuto_Adicional INT PRIMARY KEY AUTO_INCREMENT,
    planoOuro VARCHAR(45),
    planoPrata VARCHAR(45),
    valor1 VARCHAR(45),
    valor2 VARCHAR(45),
    valor3 VARCHAR(45),
    coberturasAuto_idcoberturasAuto INT,
    formAuto_idformAuto INT,
    formAuto_formGlobal_idformGlobal INT,
    FOREIGN KEY (coberturasAuto_idcoberturasAuto) REFERENCES coberturasAuto(idcoberturasAuto),
    FOREIGN KEY (formAuto_idformAuto) REFERENCES formAuto(idformAuto),
    FOREIGN KEY (formAuto_formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);

CREATE TABLE clausulasAuto (
    idclausulasAuto INT PRIMARY KEY AUTO_INCREMENT,
    clausula VARCHAR(45),
    planoOuro VARCHAR(45),
    planoPrata VARCHAR(45),
    valor VARCHAR(45),
    formAuto_idformAuto INT,
    formAuto_formGlobal_idformGlobal INT,
    FOREIGN KEY (formAuto_idformAuto) REFERENCES formAuto(idformAuto),
    FOREIGN KEY (formAuto_formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);

CREATE TABLE clausulasAuto_Adicional (
    idclausulasAuto_Adicional INT PRIMARY KEY AUTO_INCREMENT,
    planoOuro VARCHAR(45),
    planoPrata VARCHAR(45),
    valor1 VARCHAR(45),
    valor2 VARCHAR(45),
    valor3 VARCHAR(45),
    clausulasAuto_idclausulasAuto INT,
    formAuto_idformAuto INT,
    formAuto_formGlobal_idformGlobal INT,
    FOREIGN KEY (clausulasAuto_idclausulasAuto) REFERENCES clausulasAuto(idclausulasAuto),
    FOREIGN KEY (formAuto_idformAuto) REFERENCES formAuto(idformAuto),
    FOREIGN KEY (formAuto_formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);

CREATE TABLE franquiasAuto (
    idfranquiasAuto INT PRIMARY KEY AUTO_INCREMENT,
    franquia VARCHAR(45),
    planoOuro VARCHAR(45),
    planoPrata VARCHAR(45),
    valor VARCHAR(45),
    formAuto_idformAuto INT,
    formAuto_formGlobal_idformGlobal INT,
    FOREIGN KEY (formAuto_idformAuto) REFERENCES formAuto(idformAuto),
    FOREIGN KEY (formAuto_formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);

CREATE TABLE franquiasAuto_Adicional (
    idfranquiasAuto_Adicional INT PRIMARY KEY AUTO_INCREMENT,
    planoOuro VARCHAR(45),
    planoPrata VARCHAR(45),
    valor1 VARCHAR(45),
    valor2 VARCHAR(45),
    valor3 VARCHAR(45),
    franquiasAuto_idfranquiasAuto INT,
    formAuto_idformAuto INT,
    formAuto_formGlobal_idformGlobal INT,
    FOREIGN KEY (franquiasAuto_idfranquiasAuto) REFERENCES franquiasAuto(idfranquiasAuto),
    FOREIGN KEY (formAuto_idformAuto) REFERENCES formAuto(idformAuto),
    FOREIGN KEY (formAuto_formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);

CREATE TABLE formaPagamento (
    idformaPagamento INT PRIMARY KEY AUTO_INCREMENT,
    formaPagamento VARCHAR(45),
    premioPOuro VARCHAR(45),
    premioPPrata VARCHAR(45),
    valor VARCHAR(45),
    formAuto_idformAuto INT,
    formAuto_formGlobal_idformGlobal INT,
    FOREIGN KEY (formAuto_idformAuto) REFERENCES formAuto(idformAuto),
    FOREIGN KEY (formAuto_formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);

CREATE TABLE formaPagamento_Adicional (
    idformaPagamento_Adicional INT PRIMARY KEY AUTO_INCREMENT,
    premioPOuro VARCHAR(45),
    premioPPrata VARCHAR(45),
    valor1 VARCHAR(45),
    valor2 VARCHAR(45),
    valor3 VARCHAR(45),
    formaPagamento_idformaPagamento INT,
    formAuto_idformAuto INT,
    formAuto_formGlobal_idformGlobal INT,
    FOREIGN KEY (formaPagamento_idformaPagamento) REFERENCES formaPagamento(idformaPagamento),
    FOREIGN KEY (formAuto_idformAuto) REFERENCES formAuto(idformAuto),
    FOREIGN KEY (formAuto_formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);

CREATE TABLE pagamentoAuto (
    idpagamentoAuto INT PRIMARY KEY AUTO_INCREMENT,
    parcela VARCHAR(45),
    planoOuro VARCHAR(45),
    planoPrata VARCHAR(45),
    valor VARCHAR(45),
    formAuto_idformAuto INT,
    formAuto_formGlobal_idformGlobal INT,
    FOREIGN KEY (formAuto_idformAuto) REFERENCES formAuto(idformAuto),
    FOREIGN KEY (formAuto_formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);

CREATE TABLE pagamentoAuto_Adicional (
    idpagamentoAuto_Adicional INT PRIMARY KEY AUTO_INCREMENT,
    planoOuro VARCHAR(45),
    planoPrata VARCHAR(45),
    valor1 VARCHAR(45),
    valor2 VARCHAR(45),
    valor3 VARCHAR(45),
    pagamentoAuto_idpagamentoAuto INT,
    formAuto_idformAuto INT,
    formAuto_formGlobal_idformGlobal INT,
    FOREIGN KEY (pagamentoAuto_idpagamentoAuto) REFERENCES pagamentoAuto(idpagamentoAuto),
    FOREIGN KEY (formAuto_idformAuto) REFERENCES formAuto(idformAuto),
    FOREIGN KEY (formAuto_formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);

CREATE TABLE observacoes (
    idobservacoes INT PRIMARY KEY AUTO_INCREMENT,
    textArea TEXT,
    check1 INT,
    check2 INT,
    check3 INT,
    formAuto_idformAuto INT,
    formAuto_formGlobal_idformGlobal INT,
    FOREIGN KEY (formAuto_idformAuto) REFERENCES formAuto(idformAuto),
    FOREIGN KEY (formAuto_formGlobal_idformGlobal) REFERENCES formGlobal(idformGlobal)
);