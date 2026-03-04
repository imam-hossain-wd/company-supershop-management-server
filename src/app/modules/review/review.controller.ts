import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  const data = req.body;
  const result = await ReviewService.createReview(data);
  res.status(201).json({
    success: true,
    message: "Review created successfully",
    data: result,
  });
};

const getProductReviews = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ReviewService.getProductReviews(productId);
  res.status(200).json({
    success: true,
    message: "Reviews retrieved successfully",
    ...result,
  });
};

export const ReviewController = {
  createReview,
  getProductReviews,
};