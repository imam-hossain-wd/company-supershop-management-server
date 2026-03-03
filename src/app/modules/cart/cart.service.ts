import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICart } from './cart.interface';
import { Cart } from './cart.model';



const addToCart = async (payload: ICart): Promise<ICart | null> => {
  const { user, product, quantity } = payload;
  // Check if item already exists in user's cart
  const existingItem = await Cart.findOne({ user, product });

  if (existingItem) {
    return await Cart.findOneAndUpdate(
      { user, product },
      { 
        $inc: { quantity: quantity }, 
        $set: { createdAt: new Date() } 
      },
      { new: true }
    );
  }

  // If new item, create it
  return await Cart.create(payload);
};

const getMyCart = async (userId: string) => {
  return await Cart.find({ user: userId }).populate('product');
};

const removeFromCart = async (id: string) => {
  return await Cart.findByIdAndDelete(id);
};

const clearCart = async (userId: string): Promise<{ deletedCount: number }> => {
  const cartItems = await Cart.find({ user: userId });
  if (cartItems.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart is already empty!');
  }
  const result = await Cart.deleteMany({ user: userId });

  return {
    deletedCount: result.deletedCount,
  };
};

export const CartService = {
  addToCart,
  getMyCart,
  removeFromCart,
  clearCart
};