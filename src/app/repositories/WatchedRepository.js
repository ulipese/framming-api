const db = require("../../database/index");
const { callMovieAPI } = require("../api/movieApi");

class WatchedRepository {
  async findAll(idUser) {
    const dbWatchedMovies = await db.dbQuery(
      "SELECT * FROM tbJaVisto where idUsuario = ?;",
      [idUser]
    );

    // const watchedMovies = [];

    return Promise.all(
      dbWatchedMovies.map(async (watchedMovie) => {
        // make map async and await it with Promise.all()

        const completeWatchedMovie = (
          await callMovieAPI(`movie/${watchedMovie.idFilme}`, "pt-br")
        ).data; // await instead of .then()

        if (completeWatchedMovie.hasOwnProperty("original_title")) {
          // watchedMovies.push(completeWatchedMovie);
          return completeWatchedMovie;
        } else {
          console.log(`error: ${completeWatchedMovie}`);
        }
      })
    ).catch((err) => {
      console.log(err);
    });

    // return watchedMovies;
  }
}

module.exports = new WatchedRepository();
