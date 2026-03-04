"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const category_model_1 = require("./category.model");
const http_status_1 = __importDefault(require("http-status"));
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Check if category already exists
    const isExist = yield category_model_1.Category.findOne({ title: payload.title });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.FOUND, 'Category is already exist');
    }
    const result = yield category_model_1.Category.create(payload);
    return result;
});
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.find({});
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the category exists before updating
    const isExist = yield category_model_1.Category.findById(id);
    if (!isExist) {
        throw new Error('Category not found!');
    }
    const result = yield category_model_1.Category.findByIdAndUpdate(id, payload, {
        new: true, // Returns the updated document instead of the old one
        runValidators: true, // Ensures Mongoose validation runs on update
    });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the category exists before deleting
    const isExist = yield category_model_1.Category.findById(id);
    if (!isExist) {
        throw new Error('Category not found!');
    }
    const result = yield category_model_1.Category.findByIdAndDelete(id);
    return result;
});
exports.CategoryService = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
