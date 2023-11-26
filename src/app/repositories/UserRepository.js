const db = require("../../database/index");

class UserRepository {
  async findAll() {
    const users = await db.dbQuery("SELECT * FROM tbUsuario;");
    return users;
  }
  async findById(userInfo) {
    if (userInfo.length === 36 && userInfo.includes("-")) {
      const user = await db.dbQuery(
        "SELECT * FROM tbUsuario WHERE idUsuario = ?;",
        [userInfo]
      );
      return user;
    }

    const user = await db.dbQuery(
      "SELECT * FROM tbUsuario WHERE nickUsuario = ?;",
      [userInfo]
    );
    return user;
  }
  async findByUsername(username) {
    const user = await db.dbQuery(
      "SELECT * FROM tbUsuario WHERE nickUsuario = ?;",
      [username]
    );
    return user;
  }
  async findByEmail(email) {
    const user = await db.dbQuery(
      "SELECT * FROM tbUsuario WHERE emailUsuario = ?;",
      [email]
    );
    return user;
  }
  async create(user) {
    const createdUser = await db.dbQuery(
      "call spCriarUsuario(?, ?, ?, ?, ?, ?, ?)",
      [
        `${user.idUsuario}`,
        `${user.iconUsuario}`,
        `${user.nomeUsuario}`,
        `${user.nickUsuario}`,
        `${user.emailUsuario}`,
        `${user.senhaUsuario}`,
        `${(user.tipoUsuario = "nor")}`,
      ]
    );

    return createdUser[0];
  }
  async update() {}
  async delete() {}
}

module.exports = new UserRepository();
