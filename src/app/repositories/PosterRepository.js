const db = require("../../database/index");

class PosterRepository {
  async findAll() {}
  async findById(idUser) {
    const poster = await db.dbQuery(
      "SELECT linkPoster FROM tbPosterUsuario WHERE idUsuario = ?;",
      [idUser]
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
      "UPDATE tbPosterUsuario SET idFilme = ?, linkPoster = ? WHERE idUsuario = ?;",
      [idMovie, linkPoster, idUser]
    );
    return poster;
  }
  async delete() {}
}

module.exports = new PosterRepository();
