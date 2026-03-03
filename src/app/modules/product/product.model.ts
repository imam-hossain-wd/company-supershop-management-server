import { Schema, model, Types } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: Schema.Types.ObjectId, 
      ref: 'Category', 
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    netWeight: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

export const Product = model<IProduct>('Product', productSchema);