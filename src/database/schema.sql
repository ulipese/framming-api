create database dbFramming;
use dbFramming;
-- drop database dbFramming;

-- TABLES
create table tbGenero (
	idGenero int auto_increment primary key,
    genero varchar(50) not null
);
create table tbFilme (
	idFilme bigint primary key,
    notaFilme decimal(2, 1) not null,
    qtdVisualizacaoFilme int,
    situacaoFilme boolean default 0,
    filmeNacional boolean default 0
);
create table tbGeneroFilme (
	idGenero int not null,
    idFilme bigint not null,
    foreign key (idGenero) references tbGenero(idGenero),
    foreign key (idFilme) references tbFilme(idFilme)
);
create table tbUsuario (
	idUsuario varchar(36) primary key,
    iconUsuario varchar(500) default 'https://imageupload.io/ib/yzauelSzIISZpoC_1697494770.png',
    nomeUsuario varchar(50) not null,
    nickUsuario varchar(50) unique not null,
    emailUsuario varchar(100) unique not null,
    senhaUsuario varchar(60) not null,
    qtdPontos smallint default 0,
    tipoUsuario varchar(3) default "nor" -- nor (normal) / fun (funcionário) / adm (administradores / ghostfy)
);
create table tbQueroVer (
	idFilme bigint not null,
    idUsuario varchar(36) not null,
    foreign key (idFilme) references tbFilme(idFilme),
    foreign key (idUsuario) references tbUsuario(idUsuario)
);
create table tbJaVisto (
	idFilme bigint not null,
    idUsuario varchar(36) not null,
    foreign key (idFilme) references tbFilme(idFilme),
    foreign key (idUsuario) references tbUsuario(idUsuario)
);
create table tbPosterUsuario (
	idFilme bigint not null,
    idUsuario varchar(36) not null,
    linkPoster varchar(500) not null,
    foreign key (idUsuario) references tbUsuario(idUsuario)
);
create table tbFavoritoUsuario (
	idUsuario varchar(36) not null,
    idFilme bigint not null,
    foreign key (idFilme) references tbFilme(idFilme),
    foreign key (idUsuario) references tbUsuario(idUsuario)
);
create table tbSeguidores (
	idUsuario varchar(36) not null,
    idSeguidor varchar(36) not null,
    foreign key (idUsuario) references tbUsuario(idUsuario),
    foreign key (idSeguidor) references tbUsuario(idUsuario)
);
create table tbSeguindo (
	idUsuario varchar(36) not null,
    idSeguido varchar(36) not null,
    foreign key (idUsuario) references tbUsuario(idUsuario),
    foreign key (idSeguido) references tbUsuario(idUsuario)
);
create table tbLista (
	idLista int auto_increment primary key,
    idUsuario varchar(36) not null,
    descricaoLista varchar(50) not null,
    qtdCurtidaLista int default 0,
    foreign key (idUsuario) references tbUsuario(idUsuario)
);
create table tbListaFilme (
	idLista int not null,
    idFilme bigint not null,
    foreign key (idLista) references tbLista(idLista),
    foreign key (idFilme) references tbFilme(idFilme)
);
create table tbCurtidaLista (
	idLista int not null,
    idUsuario varchar(36) not null,
    foreign key (idLista) references tbLista(idLista),
    foreign key (idUsuario) references tbUsuario(idUsuario)
);
create table tbCritica (
	idCritica int auto_increment primary key,
    idFilme bigint not null,
    idUsuario varchar(36) not null,
    textoCritica varchar(400) not null,
    notaCritica double not null,
    dataCritica varchar(10) not null,
    qtdCurtidaCritica int,
    foreign key (idUsuario) references tbUsuario(idUsuario)
);
create table tbCurtidaCritica (
	idCritica int not null,
    idUsuario varchar(36) not null,
    idCriador varchar(36) not null,
    foreign key (idCritica) references tbCritica(idCritica),
    foreign key (idUsuario) references tbUsuario(idUsuario),
    foreign key (idCriador) references tbUsuario(idUsuario)
);
create table tbDiarioUsuario (
	idUsuario varchar(36) not null,
    idFilme bigint not null,
    idCritica int not null,
    foreign key (idFilme) references tbFilme(idFilme),
    foreign key (idUsuario) references tbUsuario(idUsuario),
    foreign key (idCritica) references tbCritica(idCritica)
);
create table tbRecompensa (
	idRecompensa int auto_increment primary key,
    nomeRecompensa varchar(100) not null,
    valorRecompensa int not null,
    imgRecompensa varchar(500) not null
);
create table tbPagamento (
	idPagamento int auto_increment primary key,
    idUsuario varchar(36) not null,
    numeroCartao int not null,
    nomeCartao int not null,
    cpfTitular int not null,
    validadeCartao varchar(5) not null,
    cvvCartao int not null,
    foreign key (idUsuario) references tbUsuario(idUsuario)
);
create table tbNFIngresso (
	NF int auto_increment primary key,
    idUsuario varchar(36) not null,
    idPagamento int not null,
    foreign key (idUsuario) references tbUsuario(idUsuario),
    foreign key (idPagamento) references tbPagamento(idPagamento)
);
create table tbCinema (
	idCinema int auto_increment primary key,
    nomeCinema varchar(100) not null,
    enderecoCinema varchar(300) not null,
    tokenCinema varchar(50) not null
);
create table tbSessao (
	idSessao int auto_increment primary key,
    idFilme bigint not null,
    idCinema int not null,
    dataHorarioSessao datetime not null,
    qtdIngressosSessao int not null,
    salaSessao int not null,
    foreign key (idCinema) references tbCinema(idCinema),
    foreign key (idFilme) references tbFilme(idFilme)
);
create table tbCinemaSessao (
	idCinema int not null,
    idSessao int not null,
    foreign key (idCinema) references tbCinema(idCinema),
    foreign key (idSessao) references tbSessao(idSessao)
);
create table tbIngresso (
	idIngresso int auto_increment primary key,
    idFilme bigint not null,
    valorIngresso decimal(5, 2) not null,
    tipoIngresso varchar(7) not null default "inteira", -- "meia" ou "inteira"
    idSessao int not null,
    validadeIngresso boolean not null,
    qrCodeIngresso varchar(200) not null,
    foreign key (idFilme) references tbFilme(idFilme),
    foreign key (idSessao) references tbSessao(idSessao)
);
create table tbHistoricoIngresso (
	idIngresso int not null,
    idUsuario varchar(36) not null,
	foreign key (idIngresso) references tbIngresso(idIngresso),
    foreign key (idUsuario) references tbUsuario(idUsuario)
);

-- STORED PROCEDURES
# drop procedure spCriarUsuario;
DELIMITER //
	create procedure spCriarUsuario(vIdUsuario varchar(36), vIconUsuario varchar(500), vNomeUsuario varchar(50), vNickUsuario varchar(50), vEmailUsuario varchar(100), vSenhaUsuario varchar(60), vTipoUsuario varchar(3))
	begin
		if not exists (select * from tbUsuario where idUsuario = vIdUsuario) then
			if not exists (select * from tbUsuario where emailUsuario = vEmailUsuario) then
				if not exists (select * from tbUsuario where nickUsuario = vNickUsuario) then
					insert into tbUsuario (idUsuario, iconUsuario, nomeUsuario, nickUsuario, emailUsuario, senhaUsuario, tipoUsuario) values (vIdUsuario, vIconUsuario, vNomeUsuario, vNickUsuario, vEmailUsuario, vSenhaUsuario, vTipoUsuario);
					select * from tbUsuario where idUsuario = vIdUsuario;
                else
					select 'Nick de usuário já cadastrado';
				end if;
			else
				select 'Email já cadastrado';
			end if;
		else
			select 'Usuário já existe';
		end if;
    end
//

-- call spCriarUsuario('36efc959-0425-4e81-8730-463e4f1ab09f', 'Felipe Sousa', 'lipe', 'lipe@gmail.com', '$2b$10$uF/uWmwRe/WJ5y9BpeHauueC0bNKrQCtfiUVNa1ENwyYtskYh04hW', 'nor'); -- nor / fun / adm
-- call spCriarUsuario('8a9be714-c40d-4cbc-98b2-6df9f16ad216', 'Mateus Coripio', 'matcop', 'mat@gmail.com', '$2b$10$hlRAJtuWrlNxqHZA6QqKQOWBG.hkJ.E9EIifmalqzF6e/giFOVjBq', 'adm');

# drop procedure spCurtidaCritica
DELIMITER //
	create procedure spCurtidaCritica(vIdUsuario varchar(36), vIdCriador varchar(36), vIdCritica int)
	begin
		if not exists (select * from tbUsuario where idUsuario = vIdUsuario) or not exists (select * from tbUsuario where idUsuario = vIdCriador) then
			select 'Usuário ou criador não existem';
		else
			if not exists (select * from tbCritica where idUsuario = vIdCriador and idCritica = vIdCritica) then
				select "Critica não existe";
			else
                if not exists (select * from tbCurtidaCritica where idCritica = vIdCritica and idCriador = vIdCriador and idUsuario = vIdUsuario) then
					update tbCritica set qtdCurtidaCritica = ((select qtdCurtidaCritica where idUsuario = vIdCriador and idCritica = vIdCritica) + 1) where idUsuario = vIdCriador and idCritica = vIdCritica;
					insert into tbCurtidaCritica values (vIdCritica, vIdUsuario, vIdCriador);
                    select * from tbCritica where idUsuario = vIdUsuario and idCritica = vIdCritica;
				else 
					update tbCritica set qtdCurtidaCritica = ((select qtdCurtidaCritica where idUsuario = vIdCriador and idCritica = vIdCritica) - 1) where idUsuario = vIdCriador and idCritica = vIdCritica;
					delete from tbCurtidaCritica where idCritica = vIdCritica and idUsuario = vIdUsuario and idCriador = vIdCriador;
                    select * from tbCritica where idUsuario = vIdUsuario and idCritica = vIdCritica;
				end if;
            end if;    
		end if;
    end
//
-- call spCurtidaCritica('0fed1bdf-5e99-48cc-841f-7e04bdcf4e3a', '1421d23b-41e0-4c72-8e97-8cfbef7ce1e2', 1);
update tbCritica set qtdCurtidaCritica = ((select qtdCurtidaCritica where idUsuario = '1421d23b-41e0-4c72-8e97-8cfbef7ce1e2' and idCritica = 1) +1) where idUsuario = '1421d23b-41e0-4c72-8e97-8cfbef7ce1e2';
select * from tbCurtidaCritica;
select * from tbCritica where idUsuario = '1421d23b-41e0-4c72-8e97-8cfbef7ce1e2';
-- insert into tbFilme values (34196, 4.5, 2, 0, 1)