const router = require("express").Router();
const UsersController = require("../controllers/users.js");

// Display a form for making a review
router.get("/login", UsersController.getLoginForm);

router.get("/register", UsersController.getRegisterForm);

router.post("/login", UsersController.authenticateUser);

router.post("/register", UsersController.createUser);

module.exports = router;