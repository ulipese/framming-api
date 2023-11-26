const db = require("../../database/index");

class FollowersRepository {
  async findAll(idUser) {
    const dbFollowers = await db.dbQuery(
      "SELECT * FROM tbSeguidores where idUsuario = ?;",
      [idUser]
    );

    return Promise.all(
      dbFollowers.map(async (follower) => {
        // make map async and await it with Promise.all()

        const [completeFollower] = await db.dbQuery(
          "SELECT * FROM tbUsuario where idUsuario = ?;",
          [follower.idSeguidor]
        ); // await instead of .then()

        if (completeFollower.hasOwnProperty("emailUsuario")) {
          // watchedMovies.push(completeWatchedMovie);
          return completeFollower;
        } else {
          console.log(`error: ${completeFollower}`);
        }
      })
    ).catch((err) => {
      console.log(err);
    });
  }
  async findSpecificUser(idUser, followerInfo) {
    if (followerInfo.length === 36 && followerInfo.includes("-")) {
      const follower = await db.dbQuery(
        "SELECT * FROM tbSeguidores where idUsuario = ? and idSeguidor = ?;",
        [idUser, followerInfo]
      );

      return Promise.all(
        follower.map(async (follower) => {
          // make map async and await it with Promise.all()

          const [completeFollower] = await db.dbQuery(
            "SELECT * FROM tbUsuario where idUsuario = ?;",
            [follower.idSeguidor]
          ); // await instead of .then()

          if (completeFollower.hasOwnProperty("nickUsuario")) {
            // watchedMovies.push(completeWatchedMovie);
            return completeFollower;
          } else {
            console.log(`error: ${completeFollower}`);
          }
        })
      ).catch((err) => {
        console.log(err);
      });
    } else {
      const follower = await db.dbQuery(
        "SELECT * FROM tbSeguidores where idUsuario = ? and nickSeguidor = ?;",
        [idUser, followerInfo]
      );

      return Promise.all(
        follower.map(async (follower) => {
          // make map async and await it with Promise.all()

          const [completeFollower] = await db.dbQuery(
            "SELECT * FROM tbUsuario where nickUsuario = ?;",
            [follower.nickSeguidor]
          ); // await instead of .then()

          if (completeFollower.hasOwnProperty("nickUsuario")) {
            // watchedMovies.push(completeWatchedMovie);
            return completeFollower;
          } else {
            console.log(`error: ${completeFollower}`);
          }
        })
      ).catch((err) => {
        console.log(err);
      });
    }
  }
}

module.exports = new FollowersRepository();
