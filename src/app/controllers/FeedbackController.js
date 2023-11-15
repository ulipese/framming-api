const FeedbackRepository = require("../repositories/FeedbackRepository");

class FeedbackController {
  async index(request, response) {
    const { idUser } = request.params;
    const feedbacks = await FeedbackRepository.findAll(idUser);
    if (!feedbacks) {
      return response.status(404).json({ Error: "Feedbacks not found" });
    }
    return response.status(200).json(feedbacks);
  }
  async show(request, response) {
    const { idUser, idFeedback } = request.params;

    const [feedback] = await FeedbackRepository.findById(idUser, idFeedback);

    if (!feedback) {
      return response.status(404).json({ Error: "Feedback not exists." });
    }

    return response.status(200).json(feedback);
  }
  async store(request, response) {
    const { idUser, idFeedback } = request.params;
    const { idMovie, feedbackText, feedbackRate, feedbackDate } = request.body;
    const { idCreator } = request.body;

    if (idCreator && idFeedback) {
      await FeedbackRepository.update(idUser, idCreator, idFeedback);
      const [feedback] = await FeedbackRepository.findById(
        idCreator,
        idFeedback
      );

      return response.status(200).json(feedback);
    }

    if (!idMovie || !feedbackText || !feedbackRate || !feedbackDate) {
      return response
        .status(400)
        .json({ Error: "All the feedback data are required!" });
    }

    const [feedback] = await FeedbackRepository.findById(idUser, "", idMovie);

    if (feedback) {
      await FeedbackRepository.update(
        idUser,
        "",
        "",
        idMovie,
        feedbackText,
        feedbackRate,
        feedbackDate
      );

      const [feedback] = await FeedbackRepository.findById(idUser, "", idMovie);

      return response.status(200).json(feedback);
    }

    const createdFeedback = await FeedbackRepository.create(
      idUser,
      idMovie,
      feedbackText,
      feedbackRate,
      feedbackDate
    );

    if (createdFeedback) {
      const [feedback] = await FeedbackRepository.findById(idUser, "", idMovie);
      return response.status(201).json(feedback);
    }
    return response
      .status(502)
      .json({ Error: "Feedback not created, try again later" });
  }
  async delete(request, response) {}
}

module.exports = new FeedbackController();
