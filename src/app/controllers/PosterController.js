// add movie repository
const { callPosterAPI } = require("../api/movieApi");
const PosterRepository = require("../repositories/PosterRepository");

class PosterController {
  async index(request, response) {
    const { idUser } = request.params;
    const posters = await PosterRepository.findAll(idUser);

    if (!posters) {
      return response.status(404).json("Error: Posters not exists!");
    }

    return response.status(200).json(posters);
  }
  async show(request, response) {
    const { idUser, idMovie } = request.params;
    const [poster] = await PosterRepository.findById(idUser, idMovie);

    if (!poster) {
      return response.status(404).json("Error: Poster not exists!");
    }
    return response.status(200).json(poster);
  }
  async store(request, response) {
    const { idUser } = request.params;
    const { idMovie, posterPath } = request.body;
    if (!idUser || !idMovie || !posterPath) {
      return response
        .status(400)
        .json("Error: All data are necessary to save poster!");
    }

    const [posterExists] = await PosterRepository.findById(idUser, idMovie);

    if (posterExists) {
      const poster = await PosterRepository.update(idUser, idMovie, posterPath);
      return response.status(200).json("Poster was updated!");
    }

    const poster = await PosterRepository.create(idUser, idMovie, posterPath);
    return response.status(200).json("Poster was saved!");
  }

  async delete(request, response) {}
}

module.exports = new PosterController();
