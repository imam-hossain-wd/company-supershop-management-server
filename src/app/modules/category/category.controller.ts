import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CategoryService } from "./category.service";
import sendResponse from "../../../shared/sendResponse";
import { ICategory } from "./category.interface";
import httpStatus from 'http-status';

const createCategory: RequestHandler = catchAsync(async (req, res) => {
    const result = await CategoryService.createCategory(req.body);
    sendResponse<ICategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category created successfully!',
        data: result,
    });
});

const GetAllCategory: RequestHandler = catchAsync(async (req, res) => {
    const result = await CategoryService.getAllCategories();
    sendResponse<ICategory[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Categories retrieved successfully!',
        data: result,
    });
});


const updateCategory: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CategoryService.updateCategory(id, req.body);
    sendResponse<ICategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully!',
        data: result,
    });
});

const deleteCategory: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CategoryService.deleteCategory(id);
    sendResponse<ICategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully!',
        data: result,
    });
});

export const CategoryController = {
    createCategory,
    GetAllCategory,
    updateCategory,
    deleteCategory
};