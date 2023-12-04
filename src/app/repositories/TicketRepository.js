const db = require("../../database/index");

class TicketRepository {
  async findAll(info) {
    if (!info) {
      const ticket = await db.dbQuery("SELECT * from tbIngresso;");
      return ticket;
    }
    if (info.length === 36) {
      const tickets = await db.dbQuery(
        "SELECT idUsuario, idFilme, valorIngresso, tipoIngresso, tbIngresso.idSessao, tbIngresso.idIngresso FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = ?;",
        [info]
      );

      return tickets;
    } else {
      const tickets = await db.dbQuery(
        `SELECT nomeCinema, enderecoCinema, idFilme, tbIngresso.idSessao, valorIngresso, tipoIngresso, tokenCinema, tbIngresso.idIngresso
        FROM tbIngresso
        inner join tbCinemaSessao on tbIngresso.idSessao = tbCinemaSessao.idSessao
        natural join tbCinema where tokenCinema = ?;`,
        [info]
      );

      return tickets;
    }
  }
  async findById(idUser, idMovie, idSession) {
    if (idUser && !idSession) {
      const tickets = await db.dbQuery(
        "SELECT idUsuario, idFilme, valorIngresso, tipoIngresso, tbIngresso.idSessao, tbIngresso.idIngresso FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = ? and idFilme = ?;",
        [idUser, idMovie]
      );

      return tickets;
    }
    if (idUser && idSession) {
      const tickets = await db.dbQuery(
        "SELECT idUsuario, idFilme, valorIngresso, tipoIngresso, tbIngresso.idSessao, tbIngresso.idIngresso FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = ? and idSessao = ?;",
        [idUser, idSession]
      );

      return tickets;
    }

    const tickets = await db.dbQuery(
      "SELECT * from tbIngresso where idFilme = ?;",
      [idMovie]
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
  async purchase(idUser, idMovie, idTicket, numCardPayment, numTickets = 1) {
    const Ticket = await db.dbQuery("call spCompraIngresso(?, ?, ?, ?, ?)", [
      idUser,
      idMovie,
      idTicket,
      numCardPayment,
      numTickets,
    ]);

    return Ticket;
  }
}

module.exports = new TicketRepository();
