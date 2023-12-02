const db = require("../../database/index");

class SessionRepository {
  async findAll(codCinema) {
    const Sessions = await db.dbQuery(
      "SELECT * FROM tbSessao where tokenCinema = ? order by dataHorarioSessao asc;",
      [codCinema]
    );

    return Promise.all(
      Sessions.map(async (session) => {
        const date = session.dataHorarioSessao.substring(0, 9).split("-");

        const dataSessao = `${date[2]}/${date[1]}/${date[0]}`;
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
  async findById(codCinema, idMovie) {
    if (codCinema == 0 && idMovie) {
      const Sessions = await db.dbQuery(
        "SELECT * FROM tbSessao where idFilme = ? order by dataHorarioSessao asc;",
        [idMovie]
      );

      return Promise.all(
        Sessions.map(async (session) => {
          const date = session.dataHorarioSessao.substring(0, 9).split("-");

          const dataSessao = `${date[2]}/${date[1]}/${date[0]}`;
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
      "SELECT * FROM tbSessao WHERE tokenCinema = ? and idFilme = ? order by dataHorarioSessao asc;",
      [codCinema, idMovie]
    );

    return Promise.all(
      Session.map(async (session) => {
        const date = session.dataHorarioSessao.substring(0, 9).split("-");

        const dataSessao = `${date[2]}/${date[1]}/${date[0]}`;
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

    return CinemaSession;
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
