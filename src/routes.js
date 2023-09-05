const { Router } = require("express");

const MovieController = require("./app/controllers/MovieController");

const router = Router();

router.get('/', MovieController.index);
router.get('/movies', MovieController.index);
router.get('/movies/:id', MovieController.show);

module.exports = router;