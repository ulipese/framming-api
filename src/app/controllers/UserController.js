const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");

class UserController {
  async index(request, response) {
    try {
      const users = await UserRepository.findAll();

      return response.status(200).json(users);
    } catch (err) {
      console.log(err);
      return response
        .status(502)
        .json("Error: Error: Users not found, try again later.");
    }
  }
  async show(request, response) {
    try {
      const { id } = request.params;
      if (id) {
        const [user] = await UserRepository.findById(id);

        if (!user) {
          return response.status(404).json({ Error: "User not exists." });
        }

        return response.status(200).json(user);
      }

      const { username, email, password } = await request.body;

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
    } catch (err) {
      console.log(err);
    }
  }
  async store(request, response) {
    try {
      const { name, username, email, password, userType } = request.body;

      if (!username || !email || !password) {
        return response
          .status(400)
          .json({ Error: "All the user data are required!" });
      }

      const [userExists] = await UserRepository.findByEmail(email);

      if (userExists) {
        return response
          .status(409)
          .json({ Error: "User Already Exists. Please Login!" });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await UserRepository.create({
        idUsuario: uuid(),
        nomeUsuario: name.toLowerCase(),
        nickUsuario: username.toLowerCase(),
        emailUsuario: email.toLowerCase(),
        senhaUsuario: encryptedPassword,
        tipoUsuario: userType,
      });

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "7d",
        }
      );

      user.token = token;

      return response.status(201).json({ Success: "User was created" }); // Objeto user será mandado para o front, com o token jwt
    } catch (err) {
      console.log(err);
    }
  }
  async update(request, response) {}
  async delete(request, response) {}
}

module.exports = new UserController();
