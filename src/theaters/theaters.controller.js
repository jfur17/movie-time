const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response, next) {
  const movieId = request.params.movieId;
  let data;
  
  try {
    if (movieId) {
      data = await service.listForMovie(movieId);
    } else {
      data = await service.list();
    }
    response.json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};