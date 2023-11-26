// add movie repository
const RewardRepository = require("../repositories/RewardRepository");

class RewardController {
  async index(request, response) {
    const rewards = await RewardRepository.findAll();

    if (rewards.length === 0) {
      return response
        .status(502)
        .json("Rewards methods not found, try again later");
    }
    return response.status(200).json(rewards);
  }
}

module.exports = new RewardController();
