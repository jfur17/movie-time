const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const tableName = "reviews";

async function destroy(review_id) {
  return db("reviews")
      .select('*')
      .where({"review_id": review_id})
      .del();
}

async function list(movie_id) {
  return db("reviews")
      .select("*")
      .where({movie_id})
}

async function read(review_id) {
  return db("reviews")
      .select("*")
      .where({"review_id": review_id})
      .first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

async function listForMovie(movie_id) {
  const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
  });
  
  const reviews = await db("reviews as r")
      .select("*")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .where({ "r.movie_id": movie_id });
  
  return reviews.map(addCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
  listForMovie,
};
