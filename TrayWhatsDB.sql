CREATE DATABASE `TrayWhatsDB`;
USE `TrayWhatsDB`;

CREATE TABLE `Lojista` (
    `ID` INT PRIMARY KEY AUTO_INCREMENT,
    `nome_da_loja` VARCHAR(100),
    `id_da_instancia` VARCHAR(4)
);

CREATE TABLE `Grupo Whatsapp` (
    `ID` INT PRIMARY KEY AUTO_INCREMENT,
    `nome_do_grupo` VARCHAR(200),
    `link_de_convite` VARCHAR(100),
    `capacidade_max` INT
);

CREATE TABLE `Campanhas` (
    `ID` INT PRIMARY KEY AUTO_INCREMENT,
    `nome_da_campanha` VARCHAR(10000),
    `descricao` VARCHAR(1000)
);

CREATE TABLE `Usuários` (
    `ID` INT PRIMARY KEY AUTO_INCREMENT,
    `telefone` VARCHAR(45)
);

CREATE TABLE `Mensagens` (
    `ID` INT PRIMARY KEY AUTO_INCREMENT,
    `mensagem_de_texto` VARCHAR(500),
    `marcado_para` DATE,
    `criado_em` DATE,
    `foi_enviado?` TINYINT,
    `enviado_em` DATE,
    `Lojista_ID` INT,
    `Lojista_Grupo Whatsapp_ID` INT,
    FOREIGN KEY (`Lojista_ID`) REFERENCES `Lojista`(`ID`),
    FOREIGN KEY (`Lojista_Grupo Whatsapp_ID`) REFERENCES `Grupo Whatsapp`(`ID`)
);

CREATE TABLE `Campanhas_has_Usuários` (
    `Campanhas_ID` INT,
    `Usuários_ID` INT,
    PRIMARY KEY (`Campanhas_ID`, `Usuários_ID`),
    FOREIGN KEY (`Campanhas_ID`) REFERENCES `Campanhas`(`ID`),
    FOREIGN KEY (`Usuários_ID`) REFERENCES `Usuários`(`ID`)
);

select * from Campanhas;
select * from Usuários;
select * from Campanhas_has_Usuários;
select * from `Grupo Whatsapp`;
select * from Lojista;
select * from Mensagens;