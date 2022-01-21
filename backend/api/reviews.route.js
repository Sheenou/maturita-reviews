import express from "express";

const router = express.Router();

router.get("/", ReviewsController.apiGetReviews);

export default router;