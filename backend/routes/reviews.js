const router = require("express").Router();
const ReviewsController = require("../controllers/reviews.js");
const verifyToken = require("../middleware/verifyToken.js");

// Get all reviews
router.get("/", ReviewsController.getReviews);

// Display a form for making a review
router.get("/new", ReviewsController.createReview);

// Post a new review
router.post("/", ReviewsController.getReviewForm);

router.get("/:reviewId", ReviewsController.getReview);

module.exports = router;