// add movie repository
const MovieRepository = require("../repositories/MovieRepository");

class MovieController {
  async index(request, response) {
    // discover movies

    if (request.path !== "/movies") {
      return response.redirect("/movies");
    }
    const foundMovies = (await MovieRepository.findAll()).results;

    return response.status(200).json(foundMovies);
  }
  async show(request, response) {
    const { id } = request.params;
    const movie = await MovieRepository.findById(id);

    if (!movie) {
      return response.status(404).json({ Error: "Movie not found" });
    }

    if (!movie.overview) {
      const englishMovie = await MovieRepository.findById(id, "en-US");
      const mergedMovie = [movie, (movie.overview = englishMovie.overview)][0];

      return response.status(200).json(mergedMovie);
    }

    return response.status(200).json(movie);
  }
  async store(request, response) {}
  async delete(request, response) {}
  async update(request, response) {}
}

module.exports = new MovieController();
