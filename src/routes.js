const { Router } = require("express");

const MovieController = require("./app/controllers/MovieController");
const WatchedController = require("./app/controllers/WatchedController");
const UserController = require("./app/controllers/UserController");
const PosterController = require("./app/controllers/PosterController");
const FeedbackController = require("./app/controllers/FeedbackController");
const FollowersController = require("./app/controllers/FollowersController");
const FollowingController = require("./app/controllers/FollowingController");

const router = Router();

router.get("/", MovieController.index);
router.get("/movies", MovieController.index);
router.get("/movies/:id", MovieController.show);
router.get("/nationalMovies", MovieController.index);
router.get("/nationalMovies/:id", MovieController.show);
router.get("/users", UserController.index);
router.get("/users/:id", UserController.show);
router.post("/users/register", UserController.store);
router.post("/users/login", UserController.show);
router.post("/posters/:idUser", PosterController.store);
router.get("/posters/:idUser", PosterController.index);
router.get("/posters/:idUser/:idMovie", PosterController.show);
router.get("/feedback/:id", FeedbackController.index);
router.get("/feedback/best-rated", FeedbackController.index);
router.get("/feedback/:idUser/:idFeedback", FeedbackController.show);
router.get("/feedbackMovie/:idUser/:idMovie", FeedbackController.index);
router.post("/feedback/:idUser", FeedbackController.store);
router.post("/feedback/:idUser/:idFeedback", FeedbackController.store);
router.get("/already-watched/:idUser", WatchedController.index);
router.get("/followers/:idUser", FollowersController.index);
router.get("/following/:idUser", FollowingController.index);
router.post("/following/:idUser", FollowingController.store);
module.exports = router;
