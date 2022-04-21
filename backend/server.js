// External module imports
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Get env variables if running in dev
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Internal module imports
// Routes (Controllers)
const indexRouter = require("./routes/index.js");
const reviewsRouter = require("./routes/reviews.js");
const usersRouter = require("./routes/users.js");

// Creating the express server
const app = express();

// Connecting to the DB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// Middleware
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// Routes
app.use("/", indexRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);


app.listen(process.env.PORT || 3000);