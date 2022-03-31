const router = require("express").Router();

// Get all reviews
router.get("/", (req, res) => {
    res.render("reviews/index");
});

// Display a form for making a review
router.get("/new", (req, res) => {
    res.render("reviews/new")
})

// Post a new review
router.post("/", (res, req) => {
    res.send("Create a review");
})

module.exports = router;