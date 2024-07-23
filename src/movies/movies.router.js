const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// Routes for movies
router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

// Nested routes for theaters and reviews
router.use("/:movieId/theaters", controller.movieExists, theatersRouter);
router.use("/:movieId/reviews", controller.movieExists,  reviewsRouter);

module.exports = router;