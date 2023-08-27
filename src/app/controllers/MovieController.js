// add movie repository
const MovieRepository = require("../repositories/MovieRepository");

class MovieController {
  async index(request, response) {
    // discover movies
    const movies = await MovieRepository.findAll();
    response.json(movies);
  }
  async show(request, response) {
    const { id } = request.params;
    const movie = await MovieRepository.findById(id);
    response.json(movie);
  }
}

module.exports = new MovieController();
