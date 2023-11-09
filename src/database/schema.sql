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
    nomeFilme varchar(200) not null,
    sinopseFilme varchar(3000),
    anoFilme varchar(10) not null,
    duracaoFilme smallint not null,
    notaFilme decimal(2, 1) not null,
    qtdVisualizacaoFilme int,
    situacaoFilme boolean not null,
    posterFilme varchar(500),
    fundoImgFilme varchar(500)
);
create table tbFilmeNacional (
	idFilme bigint primary key,
    nomeFilme varchar(200) not null,
    sinopseFilme varchar(3000),
    anoFilme varchar(10) not null,
    duracaoFilme smallint not null,
    notaFilme decimal(2, 1) not null,
    qtdVisualizacaoFilme int,
    situacaoFilme boolean not null,
    posterFilme varchar(500),
    fundoImgFilme varchar(500)
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
    qtdCurtidaCritica int default 0,
    foreign key (idFilme) references tbFilme(idFilme),
    foreign key (idUsuario) references tbUsuario(idUsuario)
);
create table tbCurtidaCritica (
	idCritica int not null,
    idUsuario varchar(36) not null,
    foreign key (idCritica) references tbCritica(idCritica),
    foreign key (idUsuario) references tbUsuario(idUsuario)
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

insert into tbFilmeNacional values (7347, "Tropa de Elite", "Rio de Janeiro, 1997. Nascimento, capitão da Tropa de Elite do Rio de Janeiro, é designado para chefiar uma das equipes que tem como missão 'apaziguar' o Morro do Turano por um motivo que ele considera insensato. Mas ele tem que cumprir as ordens enquanto procura por um substituto. Sua mulher, Rosane, está no final da gravidez e todos os dias lhe pede para sair da linha de frente do batalhão. Pressionado, o capitão sente os efeitos do estresse.Neste clima, é chamado para mais uma emergência num morro. Em meio a um tiroteio em um baile funk, Nascimento e sua equipe têm que resgatar dois aspirantes a oficiais da PM: Neto e Matias. Ansiosos por entrar em ação e impressionados com a eficiência de seus salvadores, os dois se candidatam ao curso de formação da Tropa de Elite.", "2007-10-12", 115, 8, 24495, false, "/yMiTQXAHJdZIWb56UGXVqbtZ75d.jpg", "/tGb044NgQYQJr58fta5O3OB6SpQ.jpg")