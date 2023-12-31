const { Router } = require("express");

const MovieController = require("./app/controllers/MovieController");
const WatchedController = require("./app/controllers/WatchedController");
const UserController = require("./app/controllers/UserController");
const PosterController = require("./app/controllers/PosterController");
const FeedbackController = require("./app/controllers/FeedbackController");
const FollowersController = require("./app/controllers/FollowersController");
const FollowingController = require("./app/controllers/FollowingController");
const WatchLaterController = require("./app/controllers/WatchLaterController");
const PaymentController = require("./app/controllers/PaymentController");
const RewardController = require("./app/controllers/RewardController");
const CinemaController = require("./app/controllers/CinemaController");
const SessionController = require("./app/controllers/SessionController");
const TicketController = require("./app/controllers/TicketController");
const ListController = require("./app/controllers/ListController");

const router = Router();

router.get("/", MovieController.index);
router.get("/movies", MovieController.index);
router.get("/movies/:id", MovieController.show);
router.get("/nationalMovies", MovieController.index);
router.get("/nationalMovies/:id", MovieController.show);
router.get("/users", UserController.index);
router.get("/func/:codCinema", UserController.index);
router.post("/updateUsers/:idUser", UserController.store);
router.get("/users/:id", UserController.show);
router.post("/deleteUsers/:idUser", UserController.delete);
router.post("/users/register", UserController.store);
router.post("/users/login", UserController.show);
router.post("/posters/:idUser", PosterController.store);
router.get("/posters/:idUser", PosterController.index);
router.get("/posters/:idUser/:idMovie", PosterController.show);
router.get("/feedback/:id", FeedbackController.index);
router.get("/feedback/best-rated", FeedbackController.index);
router.get("/feedback/:idUser/:idFeedback", FeedbackController.show);
router.get("/feedbackMovie/:idUser/:idMovie", FeedbackController.index);
router.post("/deleteFeedback/:idUser/:idFeedback", FeedbackController.delete);
router.post("/feedback/:idUser", FeedbackController.store);
router.post("/feedback/:idUser/:idFeedback", FeedbackController.store);
router.get("/already-watched/:idUser", WatchedController.index);
router.get("/followers/:idUser", FollowersController.index);
router.get("/followers/:idUser/:followerInfo", FollowersController.show);
router.get("/following/:idUser", FollowingController.index);
router.get("/following/:idUser/:userInfo", FollowingController.show);
router.post("/following/:idUser", FollowingController.store);
router.get("/watch-later/:idUser", WatchLaterController.index);
router.get("/watch-later/:idUser/:idMovie", WatchLaterController.show);
router.post("/watch-later/:idUser", WatchLaterController.store);
router.get("/favoriteMovies/:idUser", MovieController.index);
router.post("/favoriteMovies/:idUser", MovieController.store);
router.get("/favoriteMovies/:idUser/:idFavoriteMovie", MovieController.show);
router.get("/payment/:cpfUser", PaymentController.index);
router.get("/payment/:cpfUser/:numCard", PaymentController.show);
router.post("/payment/:idUser", PaymentController.store);
router.get("/reward", RewardController.index);
router.get("/cinema", CinemaController.index);
router.get("/cinema/:codCinema", CinemaController.show);
router.post("/cinema", CinemaController.store);
router.post("/deleteCinema/:codCinema", CinemaController.delete);
router.get("/session/:codCinema", SessionController.index);
router.get("/session/:codCinema/:idMovie", SessionController.show);
router.get("/session/:codCinema/:idMovie/:idSession", SessionController.show);
router.post("/session/:codCinema", SessionController.store);
router.post("/deleteSession/:codCinema/:idSession", SessionController.delete);
router.get("/ticket/:codCinema", TicketController.index);
router.get("/ticket/user/:idUser", TicketController.show);
router.get("/ticket/movie/:idMovie", TicketController.show);
router.get("/ticket/session/:idUser/:idSession", TicketController.show);
router.get("/ticket/:idUser/:idMovie", TicketController.show);
router.post("/ticket", TicketController.store);
router.post("/ticket/:idUser", TicketController.store);
router.get("/list/:idUser", ListController.index);
router.get("/list/:idUser/:idList", ListController.show);
router.post("/list/:idUser", ListController.store);
router.post("/list/:idUser/:idList", ListController.store);
router.post("/list/:idUser/:idList/:idCreator", ListController.store);
module.exports = router;
