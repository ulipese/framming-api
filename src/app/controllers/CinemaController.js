const CinemaRepository = require("../repositories/CinemaRepository");

class CinemaController {
  async index(request, response) {
    const cinemas = await CinemaRepository.findAll();

    if (!cinemas) {
      return response.status(404).json({ Error: "Cinemas not found" });
    }

    return response.status(200).json(cinemas);
  }
  async show(request, response) {
    const { codCinema } = request.params;

    const [cinema] = await CinemaRepository.findByCod(codCinema);

    if (!cinema) {
      return response.status(404).json({ Error: "Cinema not found" });
    }

    return response.status(200).json(cinema);
  }
  async store(request, response) {
    const { nameCinema, addressCinema, codCinema, numRooms } = request.body;

    const [cinema] = await CinemaRepository.findByCod(codCinema);

    if (cinema) {
      // update
      await CinemaRepository.update(
        nameCinema,
        addressCinema,
        numRooms,
        codCinema
      );

      const [cinema] = await CinemaRepository.findByCod(codCinema);

      return response.status(200).json(cinema);
    }

    const createdCinema = await CinemaRepository.create(
      nameCinema,
      addressCinema,
      codCinema,
      numRooms
    );

    if (createdCinema) {
      const [cinema] = await CinemaRepository.findByCod(codCinema);
      return response.status(200).json(cinema);
    }

    return response
      .status(502)
      .json({ Error: "Cinema not created, try again later" });
  }
  async delete(request, response) {
    const { codCinema } = request.params;

    const [cinema] = await CinemaRepository.findByCod(codCinema);

    if (cinema) {
      const deletedCinema = await CinemaRepository.delete(codCinema);

      return response.status(204).json("The cinema was deleted");
    }

    return response.status(404).json("Cinema not found");
  }
}

module.exports = new CinemaController();
