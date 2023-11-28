const db = require("../../database/index");

class SessionRepository {
  async findAll(codCinema) {
    const Sessions = await db.dbQuery(
      "SELECT * FROM tbSessao where tokenCinema = ? order by dataHorarioSessao asc;",
      [codCinema]
    );

    return Sessions;
  }
  async findById(codCinema, idMovie) {
    const Session = await db.dbQuery(
      "SELECT * FROM tbSessao WHERE tokenCinema = ? and idFilme = ? order by dataHorarioSessao asc;",
      [codCinema, idMovie]
    );

    return Session;
  }
  async create(idMovie, codCinema, datetimeSession, tickets, sessionRoom) {
    const Session = await db.dbQuery(
      "insert into tbSessao (idFilme, tokenCinema, dataHorarioSessao, qtdIngressosSessao, salaSessao) values (?, ?, ?, ?, ?)",
      [idMovie, codCinema, datetimeSession, tickets, sessionRoom]
    );

    return Session;
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
