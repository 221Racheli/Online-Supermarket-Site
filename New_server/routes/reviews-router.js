const express = require("express");
const reviewsController = require("../controllers/reviews-controller");
const verifyJWT = require("../middleware/verifyJWT")
const reviewsRouter= express.Router();


reviewsRouter.route("/")
    .post(verifyJWT,reviewsController.addReview)
    .get(verifyJWT,reviewsController.getAllReviews)

reviewsRouter.route("/:id")
    .get(verifyJWT,reviewsController.getReviewsById)
   

module.exports = reviewsRouter;

