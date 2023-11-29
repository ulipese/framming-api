const db = require("../../database/index");

class TicketRepository {
  async findAll(info) {
    if (info.length === 36) {
      const tickets = await db.dbQuery(
        "SELECT idUsuario, idFilme, valorIngresso, tipoIngresso, idSessao FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = ?;",
        [info]
      );

      return tickets;
    }

    const cinemaSession = await db.dbQuery(
      "SELECT * from tbCinemaSessao where tokenCinema = ?;",
      [info]
    );

    return Promise.all(
      cinemaSession.map(async (movie) => {
        // make map async and await it with Promise.all()
        const completeSession = await db.dbQuery(
          "SELECT * from tbIngresso where idSessao = ?",
          [movie.idSessao]
        );
        const sessions = [];
        completeSession.map((session) => {
          sessions.push(session);
        });

        if (sessions[0].hasOwnProperty("valorIngresso")) {
          return completeSession;
        } else {
          console.log(`error: ${completeSession}`);
        }
      })
    ).catch((err) => {
      console.log(err);
    });
  }
  async findById(idUser, idMovie) {
    const tickets = await db.dbQuery(
      "SELECT idUsuario, idFilme, valorIngresso, tipoIngresso, idSessao FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = ? and idFilme = ?;",
      [idUser, idMovie]
    );

    return tickets;
  }
  async create(idMovie, ticketValue, ticketType, idSession) {
    const Ticket = await db.dbQuery(
      "insert into tbIngresso (idFilme, valorIngresso, tipoIngresso, idSessao) values (?, ?, ?, ?)",
      [idMovie, ticketValue, ticketType, idSession]
    );

    return Ticket;
  }
}

module.exports = new TicketRepository();
