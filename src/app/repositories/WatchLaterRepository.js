const db = require("../../database/index");
const { callMovieAPI } = require("../api/movieApi");

class WatchLaterRepository {
  async findAll(idUser) {
    const dbWatchLaterMovies = await db.dbQuery(
      "SELECT * FROM tbQueroVer where idUsuario = ?;",
      [idUser]
    );

    return Promise.all(
      dbWatchLaterMovies.map(async (movie) => {
        // make map async and await it with Promise.all()

        const completeWatchLaterMovie = (
          await callMovieAPI(`movie/${movie.idFilme}`, "pt-br")
        ).data;

        if (completeWatchLaterMovie.hasOwnProperty("original_title")) {
          // watchedMovies.push(completeWatchedMovie);
          return completeWatchLaterMovie;
        } else {
          console.log(`error: ${completeWatchLaterMovie}`);
        }
      })
    ).catch((err) => {
      console.log(err);
    });
  }
  async findById(idUser, idMovie) {
    const dbWatchLaterMovies = await db.dbQuery(
      "SELECT * FROM tbQueroVer where idUsuario = ? and idFilme = ?;",
      [idUser, idMovie]
    );

    return Promise.all(
      dbWatchLaterMovies.map(async (movie) => {
        // make map async and await it with Promise.all()
        const completeWatchLaterMovie = (
          await callMovieAPI(`movie/${movie.idFilme}`, "pt-br")
        ).data;

        if (completeWatchLaterMovie.hasOwnProperty("original_title")) {
          // watchedMovies.push(completeWatchedMovie);
          return completeWatchLaterMovie;
        } else {
          console.log(`error: ${completeWatchLaterMovie}`);
        }
      })
    ).catch((err) => {
      console.log(err);
    });
  }
  async create(idUser, idMovie) {
    const watchLaterMovie = await db.dbQuery("call spInsertQueroVer(?, ?);", [
      idMovie,
      idUser,
    ]);

    return watchLaterMovie;
  }
}

module.exports = new WatchLaterRepository();
