// add movie repository
const MovieRepository = require("../repositories/MovieRepository");

class MovieController {
  async index(request, response) {
    // discover movies
    try {
      if (request.path !== "/movies") {
        return response.redirect("/movies");
      }
      const foundMovies = (await MovieRepository.findAll()).results;

      return response.status(200).json(foundMovies);
    } catch (err) {
      console.log(err);
      return response
        .status(502)
        .json("Error: Movies not found, try again later.");
    }
  }
  async show(request, response) {
    try {
      const { id } = request.params;
      const movie = await MovieRepository.findById(id);

      if (!movie.overview) {
        const englishMovie = await MovieRepository.findById(id, "en-US");
        const mergedMovie = [
          movie,
          (movie.overview = englishMovie.overview),
        ][0];

        return response.status(200).json(mergedMovie);
      }

      return response.status(200).json(movie);
    } catch (err) {
      console.log(err);
      return response
        .status(502)
        .json("Error: Movie not found, try again later.");
    }
  }
  async store(request, response) {}
  async delete(request, response) {}
  async update(request, response) {}
}

module.exports = new MovieController();
