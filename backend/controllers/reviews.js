const Review = require("../models/Review.js");
const pdf = require("html-pdf");
const fs = require("fs");
const path = require("path");
// const download = require("download");

class ReviewsController {
    static async getReviews(req, res) {
        console.log(req.user);
        let searchOptions = {
        };

        if (req.query.title != null && req.query.title !== "") {
            searchOptions.title = new RegExp(req.query.title, "i");
        }

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

            const html = fs.readFileSync(path.join(__dirname, "../views/reviews/pdfTemplate.ejs"));

            const options = {
                "format": "A4",
                "orientation": "portrait"
            };

            const fileName = path.join(__dirname, `../public/temp/${review.id}`); 

            res.render('reviews/pdfTemplate', { review: review }, function(err, html) {
                pdf.create(html, options).toFile(fileName, function(err, result) {
                    if (err) {
                        throw err;
                    } else {
                        res.redirect("/reviews");
                    }
                });
            });  
        } catch (error) {
            console.error(error);
            res.redirect("/reviews");
        }
    }

    static getReviewForm(req, res) {
        res.render("reviews/new", { review: new Review() })
    }

    static async createReview(req, res) {
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
    }
}

module.exports = ReviewsController;