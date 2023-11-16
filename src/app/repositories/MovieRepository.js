const db = require("../../database/index");
const { callMovieAPI } = require("../api/movieApi");

class MovieRepository {
  async findAll(language, isNational) {
    if (!isNational) {
      const movies = (await callMovieAPI("discover/movie", language)).data
        .results;
      return movies;
    }

    const dbNationalMovies = await db.dbQuery(
      "SELECT * FROM tbFilme where filmeNacional = 1;"
    );

    return Promise.all(
      dbNationalMovies.map(async (movie) => {
        // make map async and await it with Promise.all()

        const completeMovie = (
          await callMovieAPI(`movie/${movie.idFilme}`, language)
        ).data; // await instead of .then()

        if (completeMovie.hasOwnProperty("original_title")) {
          return completeMovie;
        } else {
          console.log(`error: ${completeMovie}`);
        }
      })
    ).catch((err) => {
      console.log(err);
    });
  }
  async findById(id, language, isNational) {
    if (!isNational) {
      const movie = (await callMovieAPI(`movie/${id}`, language)).data;
      return movie;
    }

    const dbNationalMovies = await db.dbQuery(
      "SELECT * FROM tbFilme WHERE filmeNacional = 1 and idFilme = ?;",
      [id]
    );
    return Promise.all(
      dbNationalMovies.map(async (movie) => {
        // make map async and await it with Promise.all()

        const completeMovie = (
          await callMovieAPI(`movie/${movie.idFilme}`, language)
        ).data; // await instead of .then()

        if (completeMovie.hasOwnProperty("original_title")) {
          return completeMovie;
        } else {
          console.log(`error: ${completeMovie}`);
        }
      })
    ).catch((err) => {
      console.log(err);
    });
  }
  async create() {}
  async update() {}
  async delete() {}
}

module.exports = new MovieRepository();
