const FeedbackRepository = require("../repositories/FeedbackRepository");

class FeedbackController {
  async index(request, response) {
    const feedbacks = await FeedbackRepository.findAll();
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
    const { name, icon, username, email, password, userType } = request.body;

    if (!username || !email || !password) {
      return response
        .status(400)
        .json({ Error: "All the user data are required!" });
    }

    const [userExists] = await FeedbackRepository.findByEmail(email);

    if (userExists) {
      return response
        .status(409)
        .json({ Error: "User Already Exists. Try Login!" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    if (icon) {
      const apiRes = callIconAPI();
    }

    const [createdUser] = await FeedbackRepository.create({
      idUsuario: uuid(),
      iconUsuario: "",
      nomeUsuario: await formatName(name.toLowerCase()),
      nickUsuario: username.toLowerCase(),
      emailUsuario: email.toLowerCase(),
      senhaUsuario: encryptedPassword,
      tipoUsuario: userType,
    });

    const token = jwt.sign(
      { userId: createdUser.idUsuario, userEmail: createdUser.emailUsuario },
      process.env.TOKEN_KEY,
      {
        expiresIn: "7d",
      }
    );

    if (createdUser) {
      return response.status(201).json({ ...createdUser, token: token });
    }
    return response
      .status(502)
      .json({ Error: "User not created, try again later" });
  }
  async update(request, response) {}
  async delete(request, response) {}
}

module.exports = new FeedbackController();
