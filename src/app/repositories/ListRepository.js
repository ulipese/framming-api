const db = require("../../database/index");
const { callMovieAPI } = require("../api/movieApi");

class ListRepository {
  async findAll(idUser) {
    const lists = await db.dbQuery(
      "SELECT * FROM tbLista WHERE idUsuario = ?;",
      [idUser]
    );

    return lists;
  }
  async findById(idUser, idList) {
    const list = await db.dbQuery(
      `SELECT tbLista.idUsuario, tbLista.idLista, tbLista.idUsuario, tbListaFilme.idFilme, tbLista.descricaoLista, tbLista.qtdCurtidaLista
      FROM tbLista
      inner join tbListaFilme on tbLista.idLista = tbListaFilme.idLista
      natural join tbFilme where tbLista.idLista = ? limit 1;`,
      [idList]
    );
    const listMovies = await db.dbQuery(
      `SELECT tbLista.idLista, tbListaFilme.idFilme
      FROM tbLista
      inner join tbListaFilme on tbLista.idLista = tbListaFilme.idLista
      where tbLista.idLista = ?;`,
      [idList]
    );
    const movies = { movies: [] };

    await Promise.all(
      listMovies.map(async (movie) => {
        // make map async and await it with Promise.all()
        const apiMovie = (await callMovieAPI(`movie/${movie.idFilme}`, "pt-br"))
          .data; // await instead of .then()
        const [dbMovie] = await db.dbQuery(
          "SELECT notaFilme, qtdVisualizacaoFilme, situacaoFilme FROM tbFilme where idFilme = ?;",
          [movie.idFilme]
        );
        const completeMovie = {
          ...dbMovie,
          ...apiMovie,
        };

        if (
          completeMovie.hasOwnProperty("original_title") &&
          completeMovie.hasOwnProperty("notaFilme")
        ) {
          movies.movies.push(completeMovie);
          return completeMovie;
        } else {
          console.log(`error: ${completeMovie}`);
        }
      })
    ).catch((err) => console.log(err));

    return [...list, movies];
  }
  async create(idUser, listDescription, idList, idMovie) {
    if (listDescription.length > 0) {
      const list = await db.dbQuery(
        "insert into tbLista values (default, ?, ?, 0)",
        [idUser, listDescription]
      );

      return list;
    }
    const list = await db.dbQuery("insert into tbListaFilme values (?, ?)", [
      idList,
      idMovie,
    ]);

    return list;
  }
  async update(idUser, idList, idCreator, listDescription) {
    if (idCreator) {
      const list = await db.dbQuery("call spCurtidaLista(?, ?, ?);", [
        idUser,
        idCreator,
        idList,
      ]);

      return list;
    }
    const list = await db.dbQuery(
      "UPDATE tbLista SET descricaoLista = ? WHERE idUsuario = ? and idLista = ?;",
      [listDescription, idUser, idList]
    );
    return list;
  }
  async delete(idUser, idList) {
    const deletedlist = await db.dbQuery(
      "delete from tbCritica where idUsuario = ? and idCritica = ?;",
      [idUser, idList]
    );

    return deletedlist;
  }
}

module.exports = new ListRepository();
