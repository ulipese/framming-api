const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { callIconAPI } = require("../api/iconApi");
const auth = require("../auth/auth");
const { v4: uuid } = require("uuid");

const formatName = async (name) => {
  return await name
    .split(" ")
    .map((word) => {
      return word.length > 3 &&
        word !== ("de" || "do" || "da" || "dos" || "das")
        ? word[0].toUpperCase() + word.substring(1)
        : word;
    })
    .join(" ");
};

class UserController {
  async index(request, response) {
    const { codCinema } = request.params;

    if (codCinema) {
      const funcs = await UserRepository.findAll(codCinema);

      if (!funcs) {
        return response.status(404).json({ Error: "Funcs not found" });
      }
      return response.status(200).json(funcs);
    }
    const users = await UserRepository.findAll();
    if (!users) {
      return response.status(404).json({ Error: "Users not found" });
    }
    return response.status(200).json(users);
  }
  async show(request, response) {
    const { id } = request.params;
    if (id) {
      const [user] = await UserRepository.findById(id);

      if (!user) {
        return response.status(404).json({ Error: "User not exists." });
      }

      return response.status(200).json(user);
    }

    const { token } = request.body;

    if (token) {
      const user = await auth(token);
      if (user) {
        return response.status(200).json(user);
      }
      if (!user || false) {
        return response.status(400).json({ Error: "Invalid token" });
      }
    }

    const { username, email, password } = request.body;

    const [user] = username
      ? await UserRepository.findByUsername(username)
      : await UserRepository.findByEmail(email);

    if (!user) {
      return response.status(404).json({ Error: "User data is incorrect." });
    }
    if (!(await bcrypt.compare(password, user.senhaUsuario))) {
      return response.status(404).json({ Error: "User data is incorrect." });
    }

    return response.status(200).json(user);
  }
  async store(request, response) {
    const { name, icon, username, email, password, userType, codCinema } =
      request.body;

    if (!name || !username || !email || !password) {
      return response
        .status(400)
        .json({ Error: "All the user data are required!" });
    }

    if (request.path.substring(0, 12) === "/updateUsers") {
      const { idUser } = request.params;

      const userExists = await UserRepository.findByEmail(email);

      if (userExists) {
        const encryptedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await UserRepository.update({
          idUsuario: idUser,
          nomeUsuario: await formatName(name.toLowerCase()),
          nickUsuario: username.toLowerCase(),
          emailUsuario: email.toLowerCase(),
          senhaUsuario: encryptedPassword,
        });

        if (updatedUser) {
          const [newUpdatedUser] = await UserRepository.findByEmail(email);

          return response.status(200).json(newUpdatedUser);
        }
      }
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const [createdUser] = await UserRepository.create({
      idUsuario: uuid(),
      iconUsuario: icon,
      nomeUsuario: await formatName(name.toLowerCase()),
      nickUsuario: username.toLowerCase(),
      emailUsuario: email.toLowerCase(),
      senhaUsuario: encryptedPassword,
      tipoUsuario: userType,
      tokenCinema: codCinema,
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
  async delete(request, response) {
    const { idUser } = request.params;

    const [user] = await UserRepository.findById(idUser);

    if (user) {
      const deletedUser = await UserRepository.delete(idUser);

      return response.status(204).json("The user was deactivated");
    }

    return response.status(404).json("User not found");
  }
}

module.exports = new UserController();
