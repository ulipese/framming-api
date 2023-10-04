const db = require("../../database/index");

class PosterRepository {
  async findAll(idUser) {
    const poster = await db.dbQuery(
      "SELECT * FROM tbPosterUsuario WHERE idUsuario = ?;",
      [idUser]
    );

    return poster;
  }
  async findById(idUser, idMovie) {
    const poster = await db.dbQuery(
      "SELECT * FROM tbPosterUsuario WHERE idUsuario = ? and idFilme = ?;",
      [idUser, idMovie]
    );

    return poster;
  }
  async create(idUser, idMovie, linkPoster) {
    const poster = await db.dbQuery(
      "INSERT INTO tbPosterUsuario VALUES (?, ?, ?);",
      [idMovie, idUser, linkPoster]
    );
    return poster;
  }
  async update(idUser, idMovie, linkPoster) {
    const poster = await db.dbQuery(
      "UPDATE tbPosterUsuario SET linkPoster = ? WHERE idUsuario = ? and idFilme = ?;",
      [linkPoster, idUser, idMovie]
    );
    return poster;
  }
  async delete() {}
}

module.exports = new PosterRepository();
