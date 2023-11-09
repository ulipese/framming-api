const db = require("../../database/index");

class FeedbackRepository {
  async findAll(idUser) {
    const feedbacks = await db.dbQuery(
      "SELECT * FROM tbCritica WHERE idUsuario = ?;",
      [idUser]
    );

    return feedbacks;
  }
  async findById(idUser, idFeedback) {
    const feedback = await db.dbQuery(
      "SELECT * FROM tbCritica WHERE idUsuario = ? and idCritica = ?;",
      [idUser, idFeedback]
    );

    return feedback;
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

module.exports = new FeedbackRepository();
