create database dbFramming;
use dbFramming;
-- drop database dbFramming;

-- TABLES
/*
create table tbGenero (
	idGenero int auto_increment primary key,
    genero varchar(50) not null
);
*/
create table tbFilme (
	idFilme bigint primary key,
    notaFilme decimal(2, 1) default 0.0,
    qtdVisualizacaoFilme int default 0,
    situacaoFilme boolean default 0,
    filmeNacional boolean default 0
);
/*
create table tbGeneroFilme (
	idGenero int not null,
    idFilme bigint not null,
    foreign key (idGenero) references tbGenero(idGenero),
    foreign key (idFilme) references tbFilme(idFilme)
);*/
create table tbUsuario (
	idUsuario varchar(36) primary key,
    iconUsuario varchar(500) default 'https://imageupload.io/ib/yzauelSzIISZpoC_1697494770.png',
    nomeUsuario varchar(50) not null,
    nickUsuario varchar(50) unique not null,
    emailUsuario varchar(100) unique not null,
    senhaUsuario varchar(60) not null,
    qtdPontos smallint default 0,
    tipoUsuario varchar(3) default "nor", -- nor (normal) / fun (funcionário) / adm (administradores / ghostfy)
    usuarioAtivo boolean default 1,
	tokenCinema int not null
);

create table tbQueroVer (
	idFilme bigint not null,
    idUsuario varchar(36) not null,
    foreign key (idFilme) references tbFilme(idFilme),
    foreign key (idUsuario) references tbUsuario(idUsuario)
);
create table tbJaVisto (
	idFilme bigint not null,
    idUsuario varchar(36) not null
);
create table tbPosterUsuario (
	idFilme bigint not null,
    idUsuario varchar(36) not null,
    linkPoster varchar(500) not null,
    foreign key (idUsuario) references tbUsuario(idUsuario)
);
create table tbFavoritoUsuario (
	idUsuario varchar(36) not null,
    idFilme bigint not null
);
create table tbSeguidores (
	idUsuario varchar(36) not null,
    idSeguidor varchar(36) not null,
    nickSeguidor varchar(50) not null,
    foreign key (idUsuario) references tbUsuario(idUsuario),
    foreign key (idSeguidor) references tbUsuario(idUsuario)
);
create table tbSeguindo (
	idUsuario varchar(36) not null,
    idSeguido varchar(36) not null,
    nickSeguido varchar(50) not null,
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
    idCriador varchar(36) not null,
    foreign key (idLista) references tbLista(idLista),
    foreign key (idUsuario) references tbUsuario(idUsuario),
    foreign key (idCriador) references tbUsuario(idUsuario)
);
create table tbCritica (
	idCritica int auto_increment primary key,
    idFilme bigint not null,
    idUsuario varchar(36) not null,
    textoCritica varchar(400),
    notaCritica double not null,
    dataCritica date not null,
    qtdCurtidaCritica int
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
    descRecompensa varchar (250) not null,
    ticketRecompensa boolean default 0,
    valorRecompensa int not null,
    imgRecompensa varchar(500) not null
);
create table tbPagamento (
	idPagamento int auto_increment primary key,
    idUsuario varchar(36) not null,
    numeroCartao bigint not null unique,
    nomeCartao varchar(50) not null,
    cpfTitular bigint not null,
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
    tokenCinema varchar(50) not null,
    qtdSala int not null
);
create table tbSessao (
	idSessao int auto_increment primary key,
    idFilme bigint not null,
    tokenCinema int not null,
    dataHorarioSessao datetime not null,
    qtdIngressosSessao int not null,
    salaSessao int not null
);
create table tbCinemaSessao (
	tokenCinema int not null,
    idSessao int not null
);
create table tbIngresso (
	idIngresso int auto_increment primary key,
    idFilme bigint not null,
    valorIngresso decimal(5, 2) not null,
    tipoIngresso varchar(7) not null default "inteira", -- "meia" ou "inteira"
    idSessao int not null,
    foreign key (idFilme) references tbFilme(idFilme),
    foreign key (idSessao) references tbSessao(idSessao)
);

create table tbHistoricoIngresso (
	idIngresso int not null,
    idUsuario varchar(36) not null,
    dataCompraIngresso datetime not null,
	foreign key (idIngresso) references tbIngresso(idIngresso),
    foreign key (idUsuario) references tbUsuario(idUsuario)
);

-- STORED PROCEDURES
# drop procedure spCriarUsuario;
DELIMITER //
	create procedure spCriarUsuario(vIdUsuario varchar(36), vIconUsuario varchar(500), vNomeUsuario varchar(50), vNickUsuario varchar(50), vEmailUsuario varchar(100), vSenhaUsuario varchar(60), vTipoUsuario varchar(3), vTokenCinema int)
	begin
		if not exists (select * from tbUsuario where idUsuario = vIdUsuario) then
			if not exists (select * from tbUsuario where emailUsuario = vEmailUsuario) then
				if not exists (select * from tbUsuario where nickUsuario = vNickUsuario) then
					insert into tbUsuario (idUsuario, iconUsuario, nomeUsuario, nickUsuario, emailUsuario, senhaUsuario, tipoUsuario, tokenCinema) values (vIdUsuario, vIconUsuario, vNomeUsuario, vNickUsuario, vEmailUsuario, vSenhaUsuario, vTipoUsuario, vTokenCinema);
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
-- select * from tbSessao where tokenCinema = 3254 order by dataHorarioSessao desc;
-- call spCriarUsuario('36BcA959-0425-4c81-8830-473e4f1ca09L', '', 'Beatriz das Chagas Silva', 'biacha', 'biacha@gmail.com', '$2b$10$uF/uWmwRe/WJ5y9BpeHauueC0bNKrQCtfiUVNa1ENwyYtskYh04hW', 'adm', 0); -- nor / fun / adm
-- call spCriarUsuario('8a9be714-c40d-4cbc-98b2-6df9f16ad216', '', 'Mateus Coripio', 'matcop', 'mat@gmail.com', '$2b$10$hlRAJtuWrlNxqHZA6QqKQOWBG.hkJ.E9EIifmalqzF6e/giFOVjBq', 'adm', 0);

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

# drop procedure spInsertCritica
DELIMITER //
	create procedure spInsertCritica(vIdUsuario varchar(36), vIdFilme bigint, vTextoCritica varchar(400), vNotaCritica double, vDataCritica date)
	begin
		INSERT INTO tbCritica (idFilme, idUsuario, textoCritica, notaCritica, dataCritica) VALUES (vIdFilme, vIdUsuario, vTextoCritica, vNotaCritica, vDataCritica);
        set @mediaFilme = (select floor((select avg(notaCritica) from tbCritica where idFilme = vIdFilme)));
        set @qtdVisu = (select count(idFilme) from tbCritica where idFilme = vIdFilme);
        
        if not exists (select * from tbFilme where idFilme = vIdFilme) then
			insert into tbFilme (idFilme, notaFilme, qtdVisualizacaoFilme) values (vIdFilme, @mediaFilme, @qtdVisu);
            if not exists (select * from tbJaVisto where idUsuario = vIdUsuario and idFilme = vIdFilme) then
				insert into tbJaVisto values (vIdFilme, vIdUsuario);
                delete from tbQueroVer where idFilme = vIdFilme and idUsuario = vIdUsuario;
			end if;
		else
			update tbFilme set notaFilme = @mediaFilme, qtdVisualizacaoFilme = @qtdVisu where idFilme = vIdFilme;
            if not exists (select * from tbJaVisto where idUsuario = vIdUsuario and idFilme = vIdFilme) then
				insert into tbJaVisto values (vIdFilme, vIdUsuario);
                delete from tbQueroVer where idFilme = vIdFilme and idUsuario = vIdUsuario;
			end if;
        end if;
    end
//
select * from tbUsuario;
-- call spInsertCritica('36efc959-0425-4e81-8730-463e4f1ab09f', 507089, 'perfeitooooo', 5, '2023-11-19');
-- insert into tbFilme values (34196, 4.5, 2, 0, 1)

# drop procedure spInserirSeguindo
DELIMITER //
	create procedure spInserirSeguindo(vIdUsuario varchar(36), vIdSeguido varchar(36))
	begin
		if not exists (select * from tbUsuario where idUsuario = vIdUsuario) or not exists (select * from tbUsuario where idUsuario = vIdSeguido) then
			select 'Usuário ou seguidor não existem';
		else
			if not exists (select * from tbSeguindo where idUsuario = vIdUsuario and idSeguido = vIdSeguido) then
				insert into tbSeguindo values (vIdUsuario, vIdSeguido, (select nickUsuario from tbUsuario where idUsuario = vIdSeguido));
                insert into tbSeguidores values (vIdSeguido, vIdUsuario, (select nickUsuario from tbUsuario where idUsuario = vIdUsuario));
			else 
				delete from tbSeguindo where idUsuario = vIdUsuario and idSeguido = vIdSeguido;
                delete from tbSeguidores where idUsuario = vIdSeguido and idSeguidor = vIdUsuario;
			end if;
		end if;    
    end
//
-- select * from tbSeguidores;
-- select * from tbSeguindo;
-- select * from tbUsuario;
-- call spInserirSeguindo('36efc959-0425-4e81-8730-463e4f1ab09f', '8a9be714-c40d-4cbc-98b2-6df9f16ad216')

# drop procedure spInsertQueroVer
DELIMITER //
	create procedure spInsertQueroVer(vIdFilme bigint, vIdUsuario varchar(36))
	begin
        if not exists (select * from tbFilme where idFilme = vIdFilme) then
			insert into tbFilme (idFilme) values (vIdFilme);
            if not exists (select * from tbQueroVer where idUsuario = vIdUsuario and idFilme = vIdFilme) then
				INSERT INTO tbQueroVer VALUES (vIdFilme, vIdUsuario);
			else 
				delete from tbQueroVer where idFilme = vIdFilme and idUsuario = vIdUsuario;
			end if;
		else
			if not exists (select * from tbQueroVer where idUsuario = vIdUsuario and idFilme = vIdFilme) then
				INSERT INTO tbQueroVer VALUES (vIdFilme, vIdUsuario);
			else 
				delete from tbQueroVer where idFilme = vIdFilme and idUsuario = vIdUsuario;
			end if;
        end if;
    end
//
-- call spInsertQueroVer(34196, '36efc959-0425-4e81-8730-463e4f1ab09f')
-- select * from tbQueroVer;

# drop procedure spInsertFilmeFavorito
DELIMITER //
	create procedure spInsertFilmeFavorito(vIdUsuario varchar(36), vIdFilme bigint)
	begin
        if not exists (select * from tbFilme where idFilme = vIdFilme) then
			insert into tbFilme (idFilme) values (vIdFilme);
            
            if (select count(idFilme) from tbFavoritoUsuario where idUsuario = vIdUsuario) = 4 then
				delete from tbFavoritoUsuario where idUsuario = vIdUsuario order by idUsuario asc limit 1;
                insert into tbFavoritoUsuario values (vIdUsuario, vIdFilme);
                select * from tbFavoritoUsuario;
			else 
				insert into tbFavoritoUsuario values (vIdUsuario, vIdFilme);
			end if;
		else
			if (select count(idFilme) from tbFavoritoUsuario where idUsuario = vIdUsuario) = 4 then
				delete from tbFavoritoUsuario where idUsuario = vIdUsuario order by idUsuario asc limit 1;
                insert into tbFavoritoUsuario values (vIdUsuario, vIdFilme);
			else 
				insert into tbFavoritoUsuario values (vIdUsuario, vIdFilme);
			end if;
        end if;
    end
//

-- call spInsertFilmeFavorito('d43e41fd-a3f9-4777-9d65-0c90d7fab610', 507089);
-- select * from tbFavoritoUsuario

-- insert into tbRecompensa (nomeRecompensa, descRecompensa, ticketRecompensa, valorRecompensa, imgRecompensa) values ("Ingresso 3D", "Ingresso 3D para você curtir seu filme da melhor forma para enquadrar sua emoção, e DE GRAÇA, pode nos agradecer depois!", 1, 800, "https://i.ibb.co/k4cnyQJ/ticket-3d.png")

DELIMITER //
CREATE EVENT autoDayInsert ON SCHEDULE EVERY 15 DAY DO BEGIN
    SET @dayCounter = 0;
    WHILE @dayCounter < 5 DO
        INSERT INTO appointmentDays(`day`) VALUES(NOW() + INTERVAL @dayCounter DAY);
        SET @dayCounter = @dayCounter +1;
    END WHILE;
    DELETE from tbSessao where idSessao > 0 order by dataHorarioSessao asc limit 10;
END //

-- set global event_scheduler=ON
-- set global max_connections = 10000;

select * from tbSessao where idSessao = 8;

select * from tbHistoricoIngresso;
# drop procedure spCompraIngresso
DELIMITER //
	create procedure spCompraIngresso(vIdUsuario varchar(36), vIdFilme bigint, vIdIngresso int, vNumeroCartaoPagamento bigint, vNumIngressos int)
	begin
    if exists (select * from tbUsuario where idUsuario = vIdUsuario) then
        if exists (select * from tbIngresso where idIngresso = vIdIngresso and idFilme = vIdFilme) then
            if exists (select idPagamento from tbPagamento where idUsuario = vIdUsuario and numeroCartao = vNumeroCartaoPagamento) then
				set @idPagamento = (select idPagamento from tbPagamento where idUsuario = vIdUsuario and numeroCartao = vNumeroCartaoPagamento);
				set @idSessao = (select idSessao from tbIngresso where idIngresso = vIdIngresso);
                
				 if ((select qtdIngressosSessao from tbSessao where idSessao = @idSessao) > 0) then
					if (vNumIngressos > 0) then
						insert into tbNFIngresso (idUsuario, idPagamento) values (vIdUsuario, @idPagamento);
						insert into tbHistoricoIngresso values (vIdIngresso, vIdUsuario, current_timestamp());
						update tbSessao set qtdIngressosSessao = ((select qtdIngressosSessao from tbSessao where idSessao = @idSessao) - vNumIngressos) where idSessao = @idSessao;
						SELECT idUsuario, idFilme, valorIngresso, tipoIngresso, idSessao, tbIngresso.idIngresso, tbHistoricoIngresso.dataCompraIngresso FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = vIdUsuario and idFilme = vIdFilme and tbIngresso.idIngresso = vIdIngresso order by dataCompraIngresso desc limit vNumIngressos;
					else
						insert into tbHistoricoIngresso values (vIdIngresso, vIdUsuario, current_timestamp());
						SELECT idUsuario, idFilme, valorIngresso, tipoIngresso, idSessao, tbIngresso.idIngresso, tbHistoricoIngresso.dataCompraIngresso FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = vIdUsuario and idFilme = vIdFilme and tbIngresso.idIngresso = vIdIngresso order by dataCompraIngresso desc limit vNumIngressos;
                    end if;
                else
					select 'Ingressos já estão esgotados';
				end if;
                
			else 
				select 'Pagamento inválido';
			end if;
		else
			select 'Ingresso inválido';
        end if;
	else
		select "Usuário não existe";
	end if;
    end
//

-- select * from tbSessao where idSessao = 6;
-- update tbSessao set qtdIngressosSessao = 50 where idSessao = 8;
-- select * from tbIngresso where idIngresso = 8;
-- insert into tbListaFilme values (2, 901362);
-- select * from tbLista;
-- update tbLista set qtdCurtidaLista = (select qtdCurtidaLista from tbLista where idLista = 1 and idUsuario = '36efc959-0425-4e81-8730-463e4f1ab09f') + 1 where idUsuario = '36efc959-0425-4e81-8730-463e4f1ab09f' and idLista = 1;

-- drop procedure spCurtidaLista;
DELIMITER //
	create procedure spCurtidaLista(vIdUsuario varchar(36), vIdCriador varchar(36), vIdLista int)
	begin
		if not exists (select * from tbUsuario where idUsuario = vIdUsuario) or not exists (select * from tbUsuario where idUsuario = vIdCriador) then
			select 'Usuário ou criador não existem';
		else
			if not exists (select * from tbLista where idUsuario = vIdCriador and idLista = vIdLista) then
				select "Lista não existe";
			else
                if not exists (select * from tbCurtidaLista where idLista = vIdLista and idCriador = vIdCriador and idUsuario = vIdUsuario) then
					update tbLista set qtdCurtidaLista = ((select qtdCurtidaLista where idUsuario = vIdCriador and idLista = vIdLista) + 1) where idUsuario = vIdCriador and idLista = vIdLista;
					insert into tbCurtidaLista values (vIdLista, vIdUsuario, vIdCriador);
                    select * from tbLista where idUsuario = vIdUsuario and idLista = vIdLista;
				else 
					update tbLista set qtdCurtidaLista = ((select qtdCurtidaLista where idUsuario = vIdCriador and idLista = vIdLista) - 1) where idUsuario = vIdCriador and idLista = vIdLista;
					delete from tbCurtidaLista where idLista = vIdLista and idUsuario = vIdUsuario and idCriador = vIdCriador;
                    select * from tbLista where idUsuario = vIdUsuario and idLista = vIdLista;
				end if;
            end if;    
		end if;
    end
//
-- insert into tbListaFilme values (2, 7347)