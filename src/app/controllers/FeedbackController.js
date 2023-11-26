const FeedbackRepository = require("../repositories/FeedbackRepository");

class FeedbackController {
  async index(request, response) {
    if (request.path.substring(0, 14) === "/feedbackMovie") {
      const { idUser, idMovie } = request.params;

      const feedbacks = await FeedbackRepository.findAll(
        idUser,
        false,
        idMovie
      );
      return response.status(200).json(feedbacks);
    }

    const { id } = request.params;

    if (request.path.substring(9, 20) === "/best-rated") {
      const feedbacks = await FeedbackRepository.findAll(id, true);
      return response.status(200).json(feedbacks);
    }
    if (id.length < 36) {
      const feedbacks = await FeedbackRepository.findAll(null, false, id);
      return response.status(200).json(feedbacks);
    }
    const feedbacks = await FeedbackRepository.findAll(id, false);
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
      // dar like
      await FeedbackRepository.update(idUser, idCreator, idFeedback);
      const [feedback] = await FeedbackRepository.findById(
        idCreator,
        idFeedback
      );

      return response.status(200).json(feedback);
    }

    if (!idMovie || !feedbackRate || !feedbackDate) {
      return response
        .status(400)
        .json({ Error: "All the feedback data are required!" });
    }

    const [feedback] = await FeedbackRepository.findById(
      idUser,
      idFeedback,
      idMovie
    );

    if (feedback && idFeedback) {
      await FeedbackRepository.update(
        idUser,
        "",
        idFeedback,
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
      // const [feedback] = await FeedbackRepository.findById(idUser, null, idMovie);
      return response.status(201).json("The feedback was sent!");
    }
    return response
      .status(502)
      .json({ Error: "Feedback not created, try again later" });
  }
  async delete(request, response) {
    const { idUser, idFeedback } = request.params;

    const [feedback] = await FeedbackRepository.findById(idUser, idFeedback);

    if (feedback) {
      const deletedFeedback = await FeedbackRepository.delete(
        idUser,
        idFeedback
      );

      return response.status(204).json("The feedback was deleted");
    }

    return response.status(404).json("Feedback not found");
  }
}

module.exports = new FeedbackController();
