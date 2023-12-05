const SessionRepository = require("../repositories/SessionRepository");

class SessionController {
  async index(request, response) {
    const { codCinema } = request.params;
    const Sessions = await SessionRepository.findAll(codCinema);

    if (!Sessions) {
      return response.status(404).json({ Error: "Sessions not found" });
    }

    return response.status(200).json(Sessions);
  }
  async show(request, response) {
    const { codCinema, idMovie, idSession } = request.params;

    const Session = await SessionRepository.findById(
      codCinema,
      idMovie,
      idSession
    );

    if (!Session) {
      return response.status(404).json({ Error: "Session not found" });
    }

    return response.status(200).json(Session);
  }
  async store(request, response) {
    const { codCinema } = request.params;
    const { idMovie, dateSession, timeSession, tickets, sessionRoom } =
      request.body;

    const unformattedDate = dateSession.split("/");

    const datetimeSession = `${unformattedDate[2]}-${unformattedDate[1]}-${unformattedDate[0]} ${timeSession}`;

    const createdSession = await SessionRepository.create(
      idMovie,
      codCinema,
      datetimeSession,
      tickets,
      sessionRoom
    );

    if (createdSession) {
      return response.status(200).json(createdSession);
    }

    return response
      .status(502)
      .json({ Error: "Session not created, try again later" });
  }
  async delete(request, response) {
    const { codCinema, idSession } = request.params;

    if (idSession) {
      const deletedSession = await SessionRepository.delete(
        idSession,
        codCinema
      );

      return response.status(204).json("The Session was deleted");
    }

    return response.status(404).json("Session not found");
  }
}

module.exports = new SessionController();
