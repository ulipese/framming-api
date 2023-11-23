const db = require("../../database/index");
const { callMovieAPI } = require("../api/movieApi");

class MovieRepository {
  async findAll(language, isNational, idUser) {
    if (idUser) {
      const dbFavoriteMovies = await db.dbQuery(
        "SELECT * FROM tbFavoritoUsuario where idUsuario = ?;",
        [idUser]
      );

      return Promise.all(
        dbFavoriteMovies.map(async (movie) => {
          // make map async and await it with Promise.all()

          const completeMovie = (
            await callMovieAPI(`movie/${movie.idFilme}`, "pt-br")
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
  async findById(id, language, isNational, idFavoriteMovie) {
    if (idFavoriteMovie) {
      const dbFavoriteMovies = await db.dbQuery(
        "SELECT * FROM tbFavoritoUsuario where idUsuario = ? and idFilme = ?;",
        [id, idFavoriteMovie]
      );

      return Promise.all(
        dbFavoriteMovies.map(async (movie) => {
          // make map async and await it with Promise.all()

          const apiMovie = (
            await callMovieAPI(`movie/${movie.idFilme}`, "pt-br")
          ).data; // await instead of .then()
          // console.log(apiMovie);
          const [dbMovie] = await db.dbQuery(
            "SELECT notaFilme, qtdVisualizacaoFilme, situacaoFilme FROM tbFilme where idFilme = ?;",
            [movie.idFilme]
          );
          // console.log(dbMovie);
          const completeMovie = { ...apiMovie, ...dbMovie };

          if (
            completeMovie.hasOwnProperty("original_title") &&
            completeMovie.hasOwnProperty("notaFilme")
          ) {
            return completeMovie;
          } else {
            console.log(`error: ${completeMovie}`);
          }
        })
      ).catch((err) => {
        console.log(err);
      });
    }

    if (!isNational) {
      const dbMovies = await db.dbQuery(
        "SELECT * FROM tbFilme where idFilme = ?;",
        [id]
      );

      return Promise.all(
        dbMovies.map(async (movie) => {
          // make map async and await it with Promise.all()

          const apiMovie = (
            await callMovieAPI(`movie/${movie.idFilme}`, "pt-br")
          ).data; // await instead of .then()
          // console.log(apiMovie);
          const [dbMovie] = await db.dbQuery(
            "SELECT notaFilme, qtdVisualizacaoFilme, situacaoFilme FROM tbFilme where idFilme = ?;",
            [movie.idFilme]
          );
          // console.log(dbMovie);
          const completeMovie = { ...apiMovie, ...dbMovie };
          console.log(completeMovie);

          if (
            completeMovie.hasOwnProperty("original_title") &&
            completeMovie.hasOwnProperty("notaFilme")
          ) {
            return completeMovie;
          } else {
            console.log(`error: ${completeMovie}`);
          }
        })
      ).catch((err) => {
        console.log(err);
      });
    }

    const dbNationalMovies = await db.dbQuery(
      "SELECT * FROM tbFilme WHERE filmeNacional = 1 and idFilme = ?;",
      [id]
    );
    return Promise.all(
      dbNationalMovies.map(async (movie) => {
        // make map async and await it with Promise.all()
        const apiMovie = (await callMovieAPI(`movie/${movie.idFilme}`, "pt-br"))
          .data; // await instead of .then()
        // console.log(apiMovie);
        const [dbMovie] = await db.dbQuery(
          "SELECT notaFilme, qtdVisualizacaoFilme, situacaoFilme FROM tbFilme where idFilme = ? and filmeNacional = 1;",
          [movie.idFilme]
        );
        // console.log(dbMovie);
        const completeMovie = { ...apiMovie, ...dbMovie };
        console.log(completeMovie);

        if (
          completeMovie.hasOwnProperty("original_title") &&
          completeMovie.hasOwnProperty("notaFilme")
        ) {
          return completeMovie;
        } else {
          console.log(`error: ${completeMovie}`);
        }
      })
    ).catch((err) => {
      console.log(err);
    });
  }
  async create(isFavMovie, idUser, idMovie) {
    if (isFavMovie) {
      const dbFavMovie = await db.dbQuery("call spInsertFilmeFavorito(?, ?)", [
        idUser,
        idMovie,
      ]);

      return dbFavMovie;
    }
  }
  async update() {}
  async delete() {}
}

module.exports = new MovieRepository();
