import { Review } from "./review.model";

const createReview = async (payload: any) => {
  const isExist = await Review.findOne({
    product: payload.product,
    user: payload?.user,
  });
  if (isExist) {
    throw new Error("You already reviewed this product");
  }
  const result = await Review.create(payload);
  return result;
};


const getProductReviews = async (productId: string) => {
  const reviews = await Review.find({ product: productId })
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  // const total = await Review.countDocuments({ product: productId });
  return reviews;
};


export const ReviewService = {
  createReview,
  getProductReviews,
};