import { Types } from 'mongoose';

export type ICart = {
  user: Types.ObjectId; // The logged-in user
  product: Types.ObjectId; // The product being added
  quantity: number;
  createdAt?: Date; // Required for TTL
};