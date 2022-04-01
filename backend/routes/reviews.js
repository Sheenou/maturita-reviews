const Review = require("../models/review");
const router = require("express").Router();

// Get all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.render("reviews/index", { reviews: reviews });
    } catch (error) {
        res.redirect("/");
    }
});

// Display a form for making a review
router.get("/new", (req, res) => {
    res.render("reviews/new", { review: new Review() })
})

// Post a new review
router.post("/", async (req, res) => {
    const review = new Review({
        title: req.body.title,
        type: req.body.type,
        student: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            class: req.body.class
        },
        date: Date.now(),
        criteria: {
            compliance: req.body.compliance,
            suitability: req.body.suitability,
            functionality: req.body.functionality,
            typography: req.body.typography,
            evaluation: req.body.evaluation,
            questions: req.body.questions,
            grade: req.body.grade
        },
    });

    try {
        const newReview = await review.save();
        // res.redirect(`reviews/${newReview.id}`);
        res.redirect("reviews");
    } catch (error) {
        res.render("reviews/new", {
            review: review,
            errorMessage: error
        })
    }
})

module.exports = router;