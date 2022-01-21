import app from "./server.js";
import express from "express";
import dotenv from "dotenv"
import mongodb from "mongodb";

dotenv.config();
const port = process.env.PORT || 3000;

const MongoClient = mongodb.MongoClient;


MongoClient.connect(process.env.MAIN_DB_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500
}).catch(e => {
    console.error(e.stack);
    process.exit(1);
}).then(async client => {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
});