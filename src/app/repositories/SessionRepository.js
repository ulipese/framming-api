const db = require("../../database/index");

class SessionRepository {
  async findAll(codCinema) {
    const Sessions = await db.dbQuery(
      "SELECT * FROM tbSessao where tokenCinema = ? order by dataHorarioSessao desc;",
      [codCinema]
    );

    return Promise.all(
      Sessions.map(async (session) => {
        const date = session.dataHorarioSessao.substring(0, 10).split("-");

        const dataSessao = `${date[2].length === 2 ? date[2] : "0" + date[2]}/${
          date[1].length === 2 ? date[1] : "0" + date[1]
        }/${date[0]}`;

        const horarioSessao = session.dataHorarioSessao
          .split(" ")[1]
          .substring(0, 5);

        session.dataSessao = dataSessao;
        session.horarioSessao = horarioSessao;
        delete session.dataHorarioSessao;

        if (session.qtdIngressosSessao !== 0) {
          const dbIngressos = await db.dbQuery(
            "SELECT idIngresso, valorIngresso, tipoIngresso FROM tbIngresso where idSessao = ? and idFilme = ?;",
            [session.idSessao, session.idFilme]
          );

          const ingressos = [];

          await dbIngressos.map((ingresso) => {
            ingressos.push(ingresso);
            return ingresso;
          });

          session.ingressos = ingressos;
        } else {
          session.ingressos = ["Ingressos foram esgotados!"];
        }

        if (session.hasOwnProperty("idSessao")) {
          return session;
        } else {
          console.log(`error: ${session}`);
        }
      })
    ).catch((err) => {
      console.log(err);
    });
  }
  async findById(codCinema, idMovie, idSession) {
    if (codCinema == 0 && idMovie != 0) {
      const Sessions = await db.dbQuery(
        "SELECT * FROM tbSessao where idFilme = ? order by dataHorarioSessao desc;",
        [idMovie]
      );

      return Promise.all(
        Sessions.map(async (session) => {
          const date = session.dataHorarioSessao.substring(0, 10).split("-");

          const dataSessao = `${
            date[2].length === 2 ? date[2] : "0" + date[2]
          }/${date[1].length === 2 ? date[1] : "0" + date[1]}/${date[0]}`;

          const horarioSessao = session.dataHorarioSessao
            .split(" ")[1]
            .substring(0, 5);

          session.dataSessao = dataSessao;
          session.horarioSessao = horarioSessao;
          delete session.dataHorarioSessao;

          if (session.qtdIngressosSessao !== 0) {
            const dbIngressos = await db.dbQuery(
              "SELECT idIngresso, valorIngresso, tipoIngresso FROM tbIngresso where idSessao = ? and idFilme = ?;",
              [session.idSessao, session.idFilme]
            );

            const ingressos = [];

            await dbIngressos.map((ingresso) => {
              ingressos.push(ingresso);
              return ingresso;
            });

            session.ingressos = ingressos;
          } else {
            session.ingressos = ["Ingressos foram esgotados!"];
          }

          if (session.hasOwnProperty("idSessao")) {
            return session;
          } else {
            console.log(`error: ${session}`);
          }
        })
      ).catch((err) => {
        console.log(err);
      });
    }
    if (codCinema == 0 && idMovie == 0) {
      const Sessions = await db.dbQuery(
        "SELECT * FROM tbSessao where idSessao = ? order by dataHorarioSessao desc;",
        [idSession]
      );

      return Promise.all(
        Sessions.map(async (session) => {
          const date = session.dataHorarioSessao.substring(0, 10).split("-");

          const dataSessao = `${
            date[2].length === 2 ? date[2] : "0" + date[2]
          }/${date[1].length === 2 ? date[1] : "0" + date[1]}/${date[0]}`;

          const horarioSessao = session.dataHorarioSessao
            .split(" ")[1]
            .substring(0, 5);

          session.dataSessao = dataSessao;
          session.horarioSessao = horarioSessao;
          delete session.dataHorarioSessao;

          if (session.qtdIngressosSessao !== 0) {
            const dbIngressos = await db.dbQuery(
              "SELECT idIngresso, valorIngresso, tipoIngresso FROM tbIngresso where idSessao = ? and idFilme = ?;",
              [session.idSessao, session.idFilme]
            );

            const ingressos = [];

            await dbIngressos.map((ingresso) => {
              ingressos.push(ingresso);
              return ingresso;
            });

            session.ingressos = ingressos;
          } else {
            session.ingressos = ["Ingressos foram esgotados!"];
          }

          if (session.hasOwnProperty("idSessao")) {
            return session;
          } else {
            console.log(`error: ${session}`);
          }
        })
      ).catch((err) => {
        console.log(err);
      });
    }

    const Session = await db.dbQuery(
      "SELECT * FROM tbSessao WHERE tokenCinema = ? and idFilme = ? order by dataHorarioSessao desc;",
      [codCinema, idMovie]
    );

    return Promise.all(
      Session.map(async (session) => {
        const date = session.dataHorarioSessao.substring(0, 10).split("-");

        const dataSessao = `${date[2].length === 2 ? date[2] : "0" + date[2]}/${
          date[1].length === 2 ? date[1] : "0" + date[1]
        }/${date[0]}`;

        const horarioSessao = session.dataHorarioSessao
          .split(" ")[1]
          .substring(0, 5);

        session.dataSessao = dataSessao;
        session.horarioSessao = horarioSessao;
        delete session.dataHorarioSessao;
        if (session.qtdIngressosSessao !== 0) {
          const dbIngressos = await db.dbQuery(
            "SELECT idIngresso, valorIngresso, tipoIngresso FROM tbIngresso where idSessao = ? and idFilme = ?;",
            [session.idSessao, session.idFilme]
          );

          const ingressos = [];

          await dbIngressos.map((ingresso) => {
            ingressos.push(ingresso);
            return ingresso;
          });

          session.ingressos = ingressos;
        } else {
          session.ingressos = ["Ingressos foram esgotados!"];
        }

        if (session.hasOwnProperty("idSessao")) {
          return session;
        } else {
          console.log(`error: ${session}`);
        }
      })
    ).catch((err) => {
      console.log(err);
    });
  }
  async create(idMovie, codCinema, datetimeSession, tickets, sessionRoom) {
    const Session = await db.dbQuery(
      "insert into tbSessao (idFilme, tokenCinema, dataHorarioSessao, qtdIngressosSessao, salaSessao) values (?, ?, ?, ?, ?);",
      [idMovie, codCinema, datetimeSession, tickets, sessionRoom]
    );

    const CinemaSession = await db.dbQuery(
      "insert into tbCinemaSessao values (?, ?);",
      [codCinema, Session.insertId]
    );

    const CreatedTicketInteira = await db.dbQuery(
      "insert into tbIngresso (idFilme, valorIngresso, tipoIngresso, idSessao) values (?, ?, ?, ?)",
      [idMovie, 30, "inteira", Session.insertId]
    );

    const CreatedTicketMeia = await db.dbQuery(
      "insert into tbIngresso (idFilme, valorIngresso, tipoIngresso, idSessao) values (?, ?, ?, ?)",
      [idMovie, 15, "meia", Session.insertId]
    );

    const [ticketInteira] = await db.dbQuery(
      "SELECT idIngresso, valorIngresso, tipoIngresso from tbIngresso where idIngresso = ?;",
      [CreatedTicketInteira.insertId]
    );

    const [ticketMeia] = await db.dbQuery(
      "SELECT idIngresso, valorIngresso, tipoIngresso from tbIngresso where idIngresso = ?;",
      [CreatedTicketMeia.insertId]
    );

    return {
      idSessao: Session.insertId,
      tickets: {
        TicketMeia: ticketMeia,
        idTicketInteira: ticketInteira,
      },
    };
  }
  // async update(nameSession, addressSession, numRooms, codSession) {
  //   const Session = await db.dbQuery(
  //     "UPDATE tbSessao SET nomeSession = ?, enderecoSession = ?, qtdSala = ? WHERE tokenSession = ?;",
  //     [nameSession, addressSession, numRooms, codSession]
  //   );
  //   return Session;
  // }
  async delete(idSession, codCinema) {
    const deletedSession = await db.dbQuery(
      "delete from tbSessao where idSessao = ? and tokenCinema = ?;",
      [idSession, codCinema]
    );

    return deletedSession;
  }
}

module.exports = new SessionRepository();
