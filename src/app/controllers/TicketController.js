const TicketRepository = require("../repositories/TicketRepository");

class TicketController {
  async index(request, response) {
    const { codCinema } = request.params;
    const tickets = await TicketRepository.findAll(codCinema);
    
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

    const ticket = await TicketRepository.findById(idUser, idMovie);

    if (!ticket) {
      return response.status(404).json({ Error: "Tickets not found" });
    }

    return response.status(200).json(ticket);
  }
  async store(request, response) {
    const { idMovie, ticketValue, ticketType, idSession } = request.body;

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
