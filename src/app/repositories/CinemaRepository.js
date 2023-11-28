const db = require("../../database/index");

class CinemaRepository {
  async findAll() {
    const cinemas = await db.dbQuery(
      "SELECT * FROM tbCinema order by nomeCinema desc;"
    );

    return cinemas;
  }
  async findByCod(codCinema) {
    const cinema = await db.dbQuery(
      "SELECT * FROM tbCinema WHERE tokenCinema = ?;",
      [codCinema]
    );

    return cinema;
  }
  async create(nameCinema, addressCinema, codCinema, numRooms) {
    const cinema = await db.dbQuery(
      "insert into tbCinema (nomeCinema, enderecoCinema, tokenCinema, qtdSala) values (?, ?, ?, ?)",
      [nameCinema, addressCinema, codCinema, numRooms]
    );

    return cinema;
  }
  async update(nameCinema, addressCinema, numRooms, codCinema) {
    const cinema = await db.dbQuery(
      "UPDATE tbCinema SET nomeCinema = ?, enderecoCinema = ?, qtdSala = ? WHERE tokenCinema = ?;",
      [nameCinema, addressCinema, numRooms, codCinema]
    );
    return cinema;
  }
  async delete(codCinema) {
    const deletedCinema = await db.dbQuery(
      "delete from tbCinema where tokenCinema = ?;",
      [codCinema]
    );

    return deletedCinema;
  }
}

module.exports = new CinemaRepository();
