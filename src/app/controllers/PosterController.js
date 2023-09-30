// add movie repository
const { callPosterAPI } = require("../api/movieApi");
const PosterRepository = require("../repositories/PosterRepository");

class PosterController {
  async index(request, response) {}
  async show(request, response) {
    try {
      const { idUser } = request.params;
      const [poster] = await PosterRepository.findById(idUser);
      if (!poster) {
        return response.status(404).json("Error: Poster not exists!");
      }
      return response.status(200).json(poster);
    } catch (err) {
      console.log(err);
      return response
        .status(502)
        .json("Error: Poster not found, try again later.");
    }
  }
  async store(request, response) {
    try {
      const { idUser, idMovie, posterPath } = request.body;
      if (!idUser || !idMovie || !posterPath) {
        return response
          .status(400)
          .json("Error: All data are necessary to save poster!");
      }

      const [posterExists] = await PosterRepository.findById(idUser);

      if (posterExists) {
        return response
          .status(400)
          .json("Error: Poster already created, try update.");
      }

      const poster = await PosterRepository.create(
        idUser,
        idMovie,
        `https://image.tmdb.org/t/p/w500${posterPath}`
      );
      return response.status(200).json("Poster was saved!");
    } catch (err) {
      console.log(err);
      return response
        .status(502)
        .json("Error: Poster don't saved, try again later.");
    }
  }
  async update(request, response) {
    try {
      const { idUser } = request.params;
      const { idMovie, posterPath } = request.body;
      if (!idUser || !idMovie || !posterPath) {
        return response
          .status(400)
          .json("Error: All data are necessary to save poster!");
      }

      const [posterExists] = await PosterRepository.findById(idUser);

      if (!posterExists) {
        return response
          .status(400)
          .json("Error: Poster wasn't created, try create first.");
      }

      const poster = await PosterRepository.update(
        idUser,
        idMovie,
        `https://image.tmdb.org/t/p/w500${posterPath}`
      );
      return response.status(200).json("Poster was updated!");
    } catch (err) {
      console.log(err);
      return response
        .status(502)
        .json("Error: Poster don't saved, try again later.");
    }
  }

  async delete(request, response) {}
}

module.exports = new PosterController();
