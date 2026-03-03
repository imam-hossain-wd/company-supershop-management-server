import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CartService } from './cart.service';
import { ICart } from './cart.interface';


const addToCart: RequestHandler = catchAsync(async (req, res) => {
  const userId = (req.user as any)._id;
  const cartData = { ...req.body, user: userId };
  
  const result = await CartService.addToCart(cartData);

  sendResponse<ICart>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product added to cart. You have 30 minutes to checkout!",
    data: result,
  });
});

// 🔹 Get only the logged-in user's cart items
const getMyCart: RequestHandler = catchAsync(async (req, res) => {
  const userId = (req.user as any)._id;
  const result = await CartService.getMyCart(userId);

  sendResponse<ICart[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart items retrieved successfully",
    data: result,
  });
});

// 🔹 Manually remove a specific item from the cart
const removeItemFromCart: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CartService.removeFromCart(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Item removed from cart successfully",
  });
});

// 🔹 Clear the entire cart (e.g., after checkout or cancel)
const clearMyCart: RequestHandler = catchAsync(async (req, res) => {
  const userId = (req.user as any)._id;
  const result = await CartService.clearCart(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your cart has been cleared",
    data: result
  });
});

export const CartController = {
  addToCart,
  getMyCart,
  removeItemFromCart,
  clearMyCart
};