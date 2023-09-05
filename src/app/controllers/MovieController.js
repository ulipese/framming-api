// add movie repository
const MovieRepository = require("../repositories/MovieRepository");

class MovieController {
  async index(request, response) {
    // discover movies
    if (request.path !== "/movies") {
      response.redirect("/movies");
    }
    const foundMovies = (await MovieRepository.findAll()).results;

    response.status(200).json(foundMovies);
  }
  async show(request, response) {
    const { id } = request.params;
    const movie = await MovieRepository.findById(id);

    if (!movie.overview) {
      const englishMovie = await MovieRepository.findById(id, "en-US");
      const mergedMovie = [movie, (movie.overview = englishMovie.overview)][0];

      response.status(200).json(mergedMovie);
    }

    response.status(200).json(movie);
  }
}

module.exports = new MovieController();
