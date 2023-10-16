const db = require("../../database/index");

class UserRepository {
  async findAll() {
    const users = await db.dbQuery("SELECT * FROM tbUsuario;");
    return users;
  }
  async findById(id) {
    const user = await db.dbQuery(
      "SELECT * FROM tbUsuario WHERE idUsuario = ?;",
      [id]
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
      "INSERT INTO `tbUsuario` (idUsuario, nomeUsuario, nickUsuario, emailUsuario, senhaUsuario, tipoUsuario) VALUES (?, ?, ?, ?, ?, ?)",
      [
        `${user.idUsuario}`,
        `${user.nomeUsuario}`,
        `${user.nickUsuario}`,
        `${user.emailUsuario}`,
        `${user.senhaUsuario}`,
        `${user.tipoUsuario}`,
      ]
    );

    return createdUser;
  }
  async update() {}
  async delete() {}
}

module.exports = new UserRepository();