import { Schema, model } from 'mongoose';
import { ICart } from './cart.interface';

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      expires: 1800 // 1800 seconds = 30 minutes
    },
  }
);

export const Cart = model<ICart>('Cart', cartSchema);