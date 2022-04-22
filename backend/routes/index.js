const router = require("express").Router();

router.get("/", (req, res) => {
    res.redirect("/reviews");
});

module.exports = router;