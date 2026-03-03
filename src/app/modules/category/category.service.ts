import ApiError from '../../../errors/ApiError';
import { ICategory } from './category.interface';
import { Category } from './category.model';
import httpStatus from 'http-status';

const createCategory = async (payload: ICategory): Promise<ICategory> => {
  // 1. Check if category already exists
  const isExist = await Category.findOne({ title: payload.title });

   if (isExist) {
    throw new ApiError(httpStatus.FOUND, 'Category is already exist');
  }

  const result = await Category.create(payload);
  return result;
};

const getAllCategories = async (): Promise<ICategory[]> => {
  return await Category.find({});
};

const updateCategory = async (
  id: string,
  payload: Partial<ICategory>
): Promise<ICategory | null> => {
  // Check if the category exists before updating
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new Error('Category not found!');
  }

  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true, // Returns the updated document instead of the old one
    runValidators: true, // Ensures Mongoose validation runs on update
  });
  return result;
};

const deleteCategory = async (id: string): Promise<ICategory | null> => {
  // Check if the category exists before deleting
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new Error('Category not found!');
  }

  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};