const db = require("../../database/index");

class FollowingRepository {
  async findAll(userInfo) {
    if (userInfo.length === 36 && userInfo.includes("-")) {
      const dbFollowing = await db.dbQuery(
        "SELECT * FROM tbSeguindo where idUsuario = ?;",
        [userInfo]
      );

      return Promise.all(
        dbFollowing.map(async (followed) => {
          // make map async and await it with Promise.all()

          const [completeFollowed] = await db.dbQuery(
            "SELECT * FROM tbUsuario where idUsuario = ?;",
            [followed.idSeguido]
          ); // await instead of .then()

          if (completeFollowed.hasOwnProperty("nickUsuario")) {
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

    const dbFollowing = await db.dbQuery(
      "SELECT * FROM tbSeguindo where nickSeguido = ?;",
      [userInfo]
    );

    return Promise.all(
      dbFollowing.map(async (followed) => {
        // make map async and await it with Promise.all()

        const [completeFollowed] = await db.dbQuery(
          "SELECT * FROM tbUsuario where nickUsuario = ?;",
          [followed.nickSeguido]
        ); // await instead of .then()

        if (completeFollowed.hasOwnProperty("nickUsuario")) {
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
  async findSpecificFollowed(idUser, followedInfo) {
    if (followedInfo.length === 36 && followedInfo.includes("-")) {
      const follower = await db.dbQuery(
        "SELECT * FROM tbSeguindo where idUsuario = ? and idSeguido = ?;",
        [idUser, followedInfo]
      );

      return Promise.all(
        follower.map(async (followed) => {
          // make map async and await it with Promise.all()

          const [completeFollowed] = await db.dbQuery(
            "SELECT * FROM tbUsuario where idUsuario = ?;",
            [followed.idSeguido]
          ); // await instead of .then()

          if (completeFollowed.hasOwnProperty("nickUsuario")) {
            // watchedMovies.push(completeWatchedMovie);
            return completeFollowed;
          } else {
            console.log(`error: ${completeFollowed}`);
          }
        })
      ).catch((err) => {
        console.log(err);
      });
    } else {
      const follower = await db.dbQuery(
        "SELECT * FROM tbSeguindo where idUsuario = ? and nickSeguido = ?;",
        [idUser, followedInfo]
      );

      return Promise.all(
        follower.map(async (followed) => {
          // make map async and await it with Promise.all()

          const [completeFollowed] = await db.dbQuery(
            "SELECT * FROM tbUsuario where nickUsuario = ?;",
            [followed.nickSeguido]
          ); // await instead of .then()

          if (completeFollowed.hasOwnProperty("nickUsuario")) {
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
