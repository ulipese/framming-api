// add movie repository
const WatchLaterRepository = require("../repositories/WatchLaterRepository");

class WatchLaterController {
  async index(request, response) {
    const { idUser } = request.params;
    const watchLaterMovies = await WatchLaterRepository.findAll(idUser);

    if (!watchLaterMovies) {
      return response.status(404).json("Watch later movies not found");
    }

    return response.status(200).json(watchLaterMovies);
  }
  async show(request, response) {
    const { idUser, idMovie } = request.params;

    const [watchLaterMovie] = await WatchLaterRepository.findById(
      idUser,
      idMovie
    );

    if (!watchLaterMovie) {
      return response.status(404).json("Watch later movie not found");
    }

    return response.status(200).json(watchLaterMovie);
  }
  async store(request, response) {
    const { idUser } = request.params;
    const { idMovie } = request.body;

    const createdWatchLaterMovie = await WatchLaterRepository.create(
      idUser,
      idMovie
    );

    const [newWatchLaterMovie] = await WatchLaterRepository.findById(
      idUser,
      idMovie
    );

    if (!newWatchLaterMovie) {
      return response
        .status(200)
        .json("The movie was removed from Watch Later");
    }
    return response.status(200).json(newWatchLaterMovie);
  }
}

module.exports = new WatchLaterController();
