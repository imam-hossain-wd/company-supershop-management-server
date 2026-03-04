import express from "express";
import { ReviewController } from "./review.controller";


const router = express.Router();

router.post("/create", ReviewController.createReview);
router.get("/:id", ReviewController.getProductReviews);

export const ReviewRoutes = router;