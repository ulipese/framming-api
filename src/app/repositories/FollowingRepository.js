const db = require("../../database/index");

class FollowingRepository {
  async findAll(idUser) {
    const dbFollowing = await db.dbQuery(
      "SELECT * FROM tbSeguindo where idUsuario = ?;",
      [idUser]
    );

    return Promise.all(
      dbFollowing.map(async (followed) => {
        // make map async and await it with Promise.all()

        const [completeFollowed] = await db.dbQuery(
          "SELECT * FROM tbUsuario where idUsuario = ?;",
          [followed.idSeguido]
        ); // await instead of .then()

        if (completeFollowed.hasOwnProperty("emailUsuario")) {
          // watchedMovies.push(completeWatchedMovie);
          return completeFollowed;
        } else {
          console.log(`error: ${completeFollowed}`);
        }
      })
    ).catch((err) => {
      console.log(err);
    });
  }
  async findById(idUser, idFollowed) {
    const follower = await db.dbQuery(
      "SELECT * FROM tbSeguindo where idUsuario = ? and idSeguido = ?;",
      [idUser, idFollowed]
    );

    return follower;
  }
  async create(idUser, idFollowed) {
    const follower = await db.dbQuery("call spInserirSeguindo(?, ?)", [
      idUser,
      idFollowed,
    ]);

    return follower;
  }
  async update() {}
  async delete() {}
}

module.exports = new FollowingRepository();
