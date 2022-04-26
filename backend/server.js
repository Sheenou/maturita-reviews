// External module imports
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

// Get env variables if running in dev
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Internal module imports
const connectDB = require("./helpers/connectToDB.js");

// Routes (Controllers)
const indexRouter = require("./routes/index.js");
const reviewsRouter = require("./routes/reviews.js");
const usersRouter = require("./routes/users.js");

// Creating the express server
const app = express();

// Connecting to the DB
connectDB(process.env.DB_URL);

// Middleware
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(express.json({ limit: "10mb", extended: true }));

// Routes
app.use("/", indexRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);


app.listen(process.env.PORT || 3000);