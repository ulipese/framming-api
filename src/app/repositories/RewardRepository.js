const db = require("../../database/index");

class RewardRepository {
  async findAll() {
    const rewards = await db.dbQuery("SELECT * FROM tbRecompensa;");

    return rewards;
  }
  async create() {
    const savedPaymentMethod = await db.dbQuery(
      "INSERT INTO tbPagamento (idUsuario, numeroCartao, nomeCartao, cpfTitular, validadeCartao, cvvCartao) VALUES (?, ?, ?, ?, ?, ?);",
      [idUser, numCard, nameCard, cpfUser, valCard, cvvCard]
    );

    return savedPaymentMethod;
  }
}

module.exports = new RewardRepository();
