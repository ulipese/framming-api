// add movie repository
const FollowersRepository = require("../repositories/FollowersRepository");

class FollowersController {
  async index(request, response) {
    const { idUser } = request.params;
    const followers = await FollowersRepository.findAll(idUser);

    if (!followers) {
      response.status(404).json("Followers not found");
    }

    response.status(200).json(followers);
  }
  async show(request, response) {
    const { idUser, followerInfo } = request.params;
    const [followers] = await FollowersRepository.findSpecificUser(idUser, followerInfo);

    if (!followers) {
      response.status(404).json("Followers not found");
    }

    response.status(200).json(followers);
  }
}

module.exports = new FollowersController();
