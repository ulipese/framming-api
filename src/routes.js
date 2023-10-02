const { Router } = require("express");

const auth = require("./app/middlewares/auth");
const MovieController = require("./app/controllers/MovieController");
const UserController = require("./app/controllers/UserController");
const PosterController = require("./app/controllers/PosterController");

const router = Router();

router.get("/", MovieController.index);
router.get("/movies", MovieController.index);
router.get("/movies/:id", MovieController.show);
router.get("/users", UserController.index);
router.get("/users/:id", UserController.show);
router.post("/users/register", UserController.store);
router.post("/users/login", UserController.show);
router.post("/posters/:idUser", PosterController.store);
router.get("/posters/:idUser", PosterController.show);

module.exports = router;
