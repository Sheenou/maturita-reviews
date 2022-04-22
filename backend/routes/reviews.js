const router = require("express").Router();
const ReviewsController = require("../controllers/reviews.js");
const authorize = require("../middleware/authorize.js");

router.use(authorize);

// Get all reviews
router.get("/", ReviewsController.getReviews);

// Display a form for making a review
router.get("/new", ReviewsController.getReviewForm);

// Post a new review
router.post("/", ReviewsController.createReview);

router.get("/:reviewId", ReviewsController.getReview);

module.exports = router;