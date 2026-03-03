import { Schema, model } from 'mongoose';
import { ICategory } from './category.interface';

const CategorySchema = new Schema<ICategory>(
  {
    title: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true 
    },
  },
  { timestamps: true }
);

export const Category = model<ICategory>('Category', CategorySchema);