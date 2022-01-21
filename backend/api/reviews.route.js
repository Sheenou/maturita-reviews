import express from "express";
import ReviewsController from "./reviews.controller.js";

const router = express.Router();

router.get("/", ReviewsController.apiGetReviews);

export default router;