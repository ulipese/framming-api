// add movie repository
const FollowingRepository = require("../repositories/FollowingRepository");

class FollowingController {
  async index(request, response) {
    const { idUser } = request.params;
    const followers = await FollowingRepository.findAll(idUser);

    if (!followers) {
      response.status(404).json("Followings not found");
    }

    response.status(200).json(followers);
  }
  async show(request, response) {
    const { idUser, userInfo } = request.params;
    const [followers] = await FollowingRepository.findSpecificFollowed(idUser, userInfo);

    if (!followers) {
      response.status(404).json("Followings not found");
    }

    response.status(200).json(followers);
  }
  async store(request, response) {
    // discover already watched movies
    const { idUser } = request.params;
    const { idFollowed } = request.body;

    if (!idUser || !idFollowed) {
      response.status(400).json("Missing data to follow user");
    }

    const following = await FollowingRepository.create(idUser, idFollowed);

    const [isFollowing] = await FollowingRepository.findSpecificFollowed(
      idUser,
      idFollowed
    );

    if (isFollowing) {
      response.status(200).json("You are following this user");
    } else {
      response.status(200).json("You don't follow more this user");
    }
  }
}

module.exports = new FollowingController();
