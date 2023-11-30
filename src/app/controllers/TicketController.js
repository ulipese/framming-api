const TicketRepository = require("../repositories/TicketRepository");

class TicketController {
  async index(request, response) {
    const { codCinema } = request.params;
    if (codCinema) {
      const tickets = await TicketRepository.findAll(codCinema);

      if (!tickets) {
        return response.status(404).json({ Error: "Tickets not found" });
      }

      return response.status(200).json(tickets);
    }
    const tickets = await TicketRepository.findAll("");

    if (!tickets) {
      return response.status(404).json({ Error: "Tickets not found" });
    }

    return response.status(200).json(tickets);
  }
  async show(request, response) {
    const { idUser, idMovie } = request.params;

    if (!idMovie) {
      const tickets = await TicketRepository.findAll(idUser);

      if (!tickets) {
        return response.status(404).json({ Error: "Tickets not found" });
      }

      return response.status(200).json(tickets);
    }

    const ticket = await TicketRepository.findById(null, idMovie);

    if (!ticket) {
      return response.status(404).json({ Error: "Tickets not found" });
    }

    return response.status(200).json(ticket);
  }
  async store(request, response) {
    const { idUser } = request.params;
    const { idMovie, ticketValue, ticketType, idSession } = request.body; // create ticket
    const { idTicket, numCardPayment, numTickets } = request.body; // buy ticket

    if (idUser) {
      const purchasedTicket = await TicketRepository.purchase(
        idUser,
        idMovie,
        idTicket,
        numCardPayment,
        numTickets
      );

      if (purchasedTicket) {
        return response.status(200).json(purchasedTicket[0]);
      }

      return response
        .status(502)
        .json({ Error: "Ticket not purchased, try again later" });
    }

    const createdTicket = await TicketRepository.create(
      idMovie,
      ticketValue,
      ticketType,
      idSession
    );

    if (createdTicket) {
      return response.status(200).json("Ticket Created");
    }

    return response
      .status(502)
      .json({ Error: "Ticket not created, try again later" });
  }
}

module.exports = new TicketController();
