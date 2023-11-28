const db = require("../../database/index");

class UserRepository {
  async findAll(codCinema) {
    if (codCinema) {
      const users = await db.dbQuery(
        "SELECT * FROM tbUsuario where tipoUsuario = 'fun' and tokenCinema = ? and usuarioAtivo = 1;",
        [codCinema]
      );
      return users;
    }
    const users = await db.dbQuery(
      "SELECT * FROM tbUsuario where usuarioAtivo = 1;"
    );
    return users;
  }
  async findById(userInfo) {
    if (userInfo.length === 36 && userInfo.includes("-")) {
      const user = await db.dbQuery(
        "SELECT * FROM tbUsuario WHERE idUsuario = ? and usuarioAtivo = 1;",
        [userInfo]
      );
      return user;
    }

    const user = await db.dbQuery(
      "SELECT * FROM tbUsuario WHERE nickUsuario = ? and usuarioAtivo = 1;",
      [userInfo]
    );
    return user;
  }
  async findByUsername(username) {
    const user = await db.dbQuery(
      "SELECT * FROM tbUsuario WHERE nickUsuario = ? and usuarioAtivo = 1;",
      [username]
    );
    return user;
  }
  async findByEmail(email) {
    const user = await db.dbQuery(
      "SELECT * FROM tbUsuario WHERE emailUsuario = ? and usuarioAtivo = 1;",
      [email]
    );
    return user;
  }
  async create(user) {
    const createdUser = await db.dbQuery(
      "call spCriarUsuario(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        `${user.idUsuario}`,
        `${user.iconUsuario}`,
        `${user.nomeUsuario}`,
        `${user.nickUsuario}`,
        `${user.emailUsuario}`,
        `${user.senhaUsuario}`,
        `${!user.tipoUsuario ? "nor" : user.tipoUsuario}`,
        `${!user.tokenCinema ? 0 : user.tokenCinema}`,
      ]
    );

    return createdUser[0];
  }
  async update(user) {
    const updatedUser = await db.dbQuery(
      "update tbUsuario set nomeUsuario = ?, nickUsuario = ?, emailUsuario = ?, senhaUsuario = ? where idUsuario = ? and usuarioAtivo = 1",
      [
        `${user.nomeUsuario}`,
        `${user.nickUsuario}`,
        `${user.emailUsuario}`,
        `${user.senhaUsuario}`,
        `${user.idUsuario}`,
      ]
    );

    return updatedUser;
  }
  async delete(idUser) {
    const deletedUser = await db.dbQuery(
      "update tbUsuario set usuarioAtivo = 0 where idUsuario = ?;",
      [idUser]
    );

    return deletedUser;
  }
}

module.exports = new UserRepository();
