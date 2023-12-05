const db = require("../../database/index");

class TicketRepository {
  async findAll(info) {
    if (!info) {
      const ticket = await db.dbQuery("SELECT * from tbIngresso;");
      return ticket;
    }
    if (info.length === 36) {
      const dbTickets = await db.dbQuery(
        "SELECT idUsuario, idFilme, valorIngresso, tipoIngresso, tbHistoricoIngresso.dataCompraIngresso,tbIngresso.idSessao, tbIngresso.idIngresso FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = ? order by tbIngresso.idSessao desc;",
        [info]
      );

      const ids = [];
      const arrTickets = [{ idSessao: 0, qtdTickets: 0 }];

      dbTickets.map((ticket) => {
        if (!ids.includes(ticket.idSessao)) {
          return ids.push(ticket.idSessao);
        }
      });

      console.log(ids);

      await Promise.all(
        ids.map(async (idSessao) => {
          // make map async and await it with Promise.all()
          const [countSessions] = await db.dbQuery(
            "SELECT count(idSessao) FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = ? and idSessao = ? order by tbIngresso.idSessao desc;",
            [info, idSessao]
          );

          console.log();

          if (countSessions) {
            arrTickets.push({
              idSessao: idSessao,
              qtdTickets: countSessions["count(idSessao)"],
            });
            return countSessions;
          } else {
            console.log(`error: ${countSessions}`);
          }
        })
      ).catch((err) => console.log(err));

      return arrTickets.slice(1);
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
        "SELECT idUsuario, idFilme, valorIngresso, tipoIngresso, tbIngresso.idSessao, tbIngresso.idIngresso FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = ? and idFilme = ? order by tbHistoricoIngresso.dataCompraIngresso desc;",
        [idUser, idMovie]
      );

      return tickets;
    }
    if (idUser && idSession) {
      const dbTickets = await db.dbQuery(
        "SELECT idUsuario, idFilme, valorIngresso, tipoIngresso, tbIngresso.idSessao, tbIngresso.idIngresso FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = ? and idSessao = ? order by tbHistoricoIngresso.dataCompraIngresso desc;",
        [idUser, idSession]
      );

      return dbTickets;
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
    for (let i = 0; i < numTickets - 1; i++) {
      if (i === 0) {
        const Tickets = await db.dbQuery(
          "call spCompraIngresso(?, ?, ?, ?, ?)",
          [idUser, idMovie, idTicket, numCardPayment, numTickets]
        );
      } else {
        const Tickets = await db.dbQuery(
          "call spCompraIngresso(?, ?, ?, ?, ?)",
          [idUser, idMovie, idTicket, numCardPayment, 0]
        );
      }
    }

    const Ticket = await db.dbQuery("call spCompraIngresso(?, ?, ?, ?, ?)", [
      idUser,
      idMovie,
      idTicket,
      numCardPayment,
      0,
    ]);

    const seeTickets = await db.dbQuery(
      "SELECT idUsuario, idFilme, valorIngresso, tipoIngresso, idSessao, tbIngresso.idIngresso, tbHistoricoIngresso.dataCompraIngresso FROM tbIngresso inner join tbHistoricoIngresso on tbIngresso.idIngresso = tbHistoricoIngresso.idIngresso where idUsuario = ? and tbIngresso.idFilme = ? and tbIngresso.idIngresso = ? order by dataCompraIngresso desc limit ?;",
      [idUser, idMovie, idTicket, numTickets]
    );

    seeTickets[0].qtdIngressosComprados = numTickets;
    return seeTickets;
  }
}

module.exports = new TicketRepository();
