const knex = require("../db/connection");

async function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

async function list(movieId) {
  return knex("reviews")
    .where({ movie_id: movieId })
    .select("*")
    .then((reviews) => Promise.all(reviews.map(setCritic)));
}

async function read(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).first();
}

async function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return knex("reviews")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = { destroy, list, read, update };
