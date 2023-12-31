// add movie repository
const MovieRepository = require("../repositories/MovieRepository");

class MovieController {
  async index(request, response) {
    // discover movies
    if (request.path === "/nationalMovies") {
      const foundNationalMovies = await MovieRepository.findAll("pt-br", true);
      return response.status(200).json(foundNationalMovies);
    }
    if (request.path.substring(0, 15) === "/favoriteMovies") {
      const { idUser } = request.params;
      const foundMovies = await MovieRepository.findAll("pt-br", false, idUser);
      return response.status(200).json(foundMovies);
    }

    if (request.path !== "/movies") {
      return response.redirect("/movies");
    }

    const foundMovies = await MovieRepository.findAll();

    return response.status(200).json(foundMovies);
  }
  async show(request, response) {
    const { id } = request.params;

    if (request.path.substring(0, 15) === "/favoriteMovies") {
      const { idUser, idFavoriteMovie } = request.params;
      const foundMovie = await MovieRepository.findById(
        idUser,
        "pt-br",
        false,
        idFavoriteMovie
      );
      return response.status(200).json(foundMovie);
    }

    if (request.path.substring(0, 7) !== "/movies") {
      const [foundNationalMovie] = await MovieRepository.findById(
        id,
        "pt-br",
        true
      );

      if (!foundNationalMovie) {
        return response.status(404).json({ Error: "Movie not found" });
      }

      if (!foundNationalMovie.overview) {
        const englishMovie = await MovieRepository.findById(id, "en-US");
        const mergedMovie = [
          foundNationalMovie,
          (foundNationalMovie.overview = englishMovie.overview),
        ][0];

        return response.status(200).json(mergedMovie);
      }

      return response.status(200).json(foundNationalMovie);
    }

    const movie = await MovieRepository.findById(id, "pt-BR", null);
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
  async store(request, response) {
    if (request.path.substring(0, 15) === "/favoriteMovies") {
      const { idUser } = request.params;
      const { idMovie } = request.body;

      if (!idUser || !idMovie) {
        return response
          .status(400)
          .json("All the data are required to save a favorite movie");
      }

      const favMovie = await MovieRepository.create(true, idUser, idMovie);

      // const favoritedMovie = await MovieRepository.findById(
      //   idMovie,
      //   "pt-br",
      //   false,
      //   null
      // );
      if (favMovie) {
        return response.status(200).json("The movie was favorited");
      }

      return response
        .status(502)
        .json("The movie wasn't favorited, try again later");
    }

    // // salvar os filmes dos cinemas
    // const {} = request.body;
    // if ("") {
    //   return response
    //     .status(400)
    //     .json({ Error: "All the movie data are required!" });
    // }
    // const [movieExists] = await MovieRepository.findByEmail(email);
    // if (movieExists) {
    //   return response
    //     .status(200)
    //     .json({ Error: "The movie data are update!" });
    // }
    // const [createdMovie] = await MovieRepository.create({});
    // if (createdMovie) {
    //   return response.status(201).json({ createdMovie });
    // }
    // return response
    //   .status(502)
    //   .json({ Error: "Movie not saved, try again later" });
  }
  async delete(request, response) {}
  async update(request, response) {}
}

module.exports = new MovieController();
