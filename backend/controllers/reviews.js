const Review = require("../models/Review.js");

class ReviewsController {
    static async getReviews(req, res) {
        let searchOptions = {};

        if (req.query.title != null && req.query.title !== "") {
            searchOptions.title = new RegExp(req.query.title, "i");
        }
        searchOptions.public = true;

        try {
            const reviews = await Review.find(searchOptions);
            res.render("reviews/index", { 
                reviews: reviews,
                searchOptions: req.query.title
            });
        } catch (error) {
            res.redirect("/");
        }
    }

    static async getReview(req, res) {
        try {
            const review = await Review.findById(req.params.reviewId);

            if (!review) throw new Error("Neexistuje posudek s tímto ID");

            res.render("reviews/showReview", {
                review: review
            });
        } catch (error) {
            console.log(error);
            res.redirect("/reviews");
        }
    }

    static createReview(req, res) {
        res.render("reviews/new", { review: new Review() })
    }

    static async getReviewForm(req, res) {
        const review = new Review({
            title: req.body.title,
            type: req.body.type,
            public: req.body.public,
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
    }
}

module.exports = ReviewsController;