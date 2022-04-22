const mongoose = require("mongoose");

function connectDB(dbUrl) {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.on("error", error => console.error(error));
    db.once("open", () => console.log("Connected to Mongoose"));
}

module.exports = connectDB;
