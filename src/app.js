if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const cors = require("cors");



app.use(cors());
app.use(express.json());
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use((request, response, next) => {
    response.status(404).json({ error: 'Not Found' });
});

app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});

module.exports = app;
