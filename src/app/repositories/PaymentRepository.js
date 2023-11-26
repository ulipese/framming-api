const db = require("../../database/index");

class PaymentRepository {
  async findAll(cpfUser) {
    const paymentMethods = await db.dbQuery(
      "SELECT * FROM tbPagamento where cpfTitular = ?;",
      [cpfUser]
    );

    return paymentMethods;
  }
  async findByNumCard(numCard) {
    const [paymentMethod] = await db.dbQuery(
      "SELECT * FROM tbPagamento where numeroCartao = ?;",
      [numCard]
    );

    return paymentMethod;
  }
  async create(idUser, numCard, nameCard, cpfUser, valCard, cvvCard) {
    const savedPaymentMethod = await db.dbQuery(
      "INSERT INTO tbPagamento (idUsuario, numeroCartao, nomeCartao, cpfTitular, validadeCartao, cvvCartao) VALUES (?, ?, ?, ?, ?, ?);",
      [idUser, numCard, nameCard, cpfUser, valCard, cvvCard]
    );

    return savedPaymentMethod;
  }
}

module.exports = new PaymentRepository();
