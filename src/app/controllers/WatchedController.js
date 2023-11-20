// add movie repository
const WatchedRepository = require("../repositories/WatchedRepository");

class WatchedController {
  async index(request, response) {
    // discover already watched movies
    const { idUser } = request.params;
    const watchedMovies = await WatchedRepository.findAll(idUser);

    if (!watchedMovies) {
      response.status(404).json("Watched Movies not found");
    }

    response.status(200).json(watchedMovies);
  }
}

module.exports = new WatchedController();
