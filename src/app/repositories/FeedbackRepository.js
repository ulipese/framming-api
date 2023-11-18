const db = require("../../database/index");

class FeedbackRepository {
  async findAll(idUser, bestRated, idMovie) {
    if (!idUser && idMovie) {
      const feedbacks = await db.dbQuery(
        "SELECT * FROM tbCritica WHERE idFilme = ?;",
        [idMovie]
      );

      return feedbacks;
    }
    if (bestRated) {
      const feedbacks = await db.dbQuery(
        "SELECT * FROM tbCritica order by qtdCurtidaCritica desc limit 10;"
      );

      return feedbacks;
    }
    if (idUser && idMovie) {
      const feedbacks = await db.dbQuery(
        "SELECT * FROM tbCritica WHERE idFilme = ? and idUsuario = ?;",
        [idMovie, idUser]
      );

      return feedbacks;
    }
    const feedbacks = await db.dbQuery(
      "SELECT * FROM tbCritica WHERE idUsuario = ?;",
      [idUser]
    );

    return feedbacks;
  }
  async findById(idUser, idFeedback, idMovie) {
    if (idFeedback) {
      const feedback = await db.dbQuery(
        "SELECT * FROM tbCritica WHERE idUsuario = ? and idCritica = ?;",
        [idUser, idFeedback]
      );

      return feedback;
    }
    const feedback = await db.dbQuery(
      "SELECT * FROM tbCritica WHERE idUsuario = ? and idFilme = ?;",
      [idUser, idMovie]
    );

    return feedback;
  }
  async create(idUser, idMovie, feedbackText = "", feedbackRate, feedbackDate) {
    const feedback = await db.dbQuery("call spInsertCritica(?, ?, ?, ?, ?)", [
      idUser,
      idMovie,
      feedbackText,
      feedbackRate,
      feedbackDate,
    ]);
    return feedback;
  }
  async update(
    idUser,
    idCreator,
    idFeedback,
    idMovie,
    feedbackText,
    feedbackRate,
    feedbackDate
  ) {
    if (idCreator) {
      const feedback = await db.dbQuery("CALL spCurtidaCritica(?, ?, ?);", [
        idUser,
        idCreator,
        idFeedback,
      ]);

      return feedback;
    }
    const feedback = await db.dbQuery(
      "UPDATE tbCritica SET textoCritica = ?, notaCritica = ?, dataCritica = ? WHERE idUsuario = ? and idFilme = ?;",
      [feedbackText, feedbackRate, feedbackDate, idUser, idMovie]
    );
    return feedback;
  }
  async delete() {}
}

module.exports = new FeedbackRepository();
