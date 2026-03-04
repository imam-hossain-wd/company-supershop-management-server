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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_constants_1 = require("./product.constants");
const product_model_1 = require("./product.model");
const category_model_1 = require("../category/category.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExist = yield category_model_1.Category.findById(payload.category);
    if (!isCategoryExist) {
        throw new Error('The specified category does not exist!');
    }
    const result = yield product_model_1.Product.create(payload);
    const populatedResult = yield result.populate('category');
    return populatedResult;
});
const getAllProducts = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { sortBy, sortOrder } = options;
    const category = filtersData.category;
    const minPrice = Number(filtersData.minPrice);
    const maxPrice = Number(filtersData.maxPrice);
    const andConditions = [];
    const stringFields = product_constants_1.productSearchAbleFields.filter(field => field !== 'price');
    //@ts-ignore
    const numericSearchTerm = !isNaN(parseFloat(searchTerm)) ? parseFloat(searchTerm) : null;
    const priceRange = 1;
    if (searchTerm) {
        const orConditions = stringFields.map((field) => ({
            [field]: {
                $regex: searchTerm,
                $options: 'i',
            },
        }));
        // Add condition for numeric search in price with a range
        if (numericSearchTerm !== null) {
            orConditions.push({
                price: {
                    //@ts-ignore
                    $gte: numericSearchTerm - priceRange,
                    $lte: numericSearchTerm + priceRange
                }
            });
        }
        andConditions.push({ $or: orConditions });
    }
    // filtering by min or max price 
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        andConditions.push({
            price: {
                $gte: minPrice,
                $lte: maxPrice,
            },
        });
    }
    else if (!isNaN(minPrice)) {
        andConditions.push({
            price: {
                $gte: minPrice,
            },
        });
    }
    else if (!isNaN(maxPrice)) {
        andConditions.push({
            price: {
                $lte: maxPrice,
            },
        });
    }
    if (category) {
        andConditions.push({ category });
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const sortConditions = {};
    if (sortBy && sortOrder) {
        //@ts-ignore
        sortConditions[sortBy] = sortOrder;
    }
    const [data, total] = yield Promise.all([
        product_model_1.Product.find(whereConditions).sort(sortConditions).skip(skip).limit(limit),
        product_model_1.Product.countDocuments(whereConditions),
    ]);
    return {
        meta: {
            page,
            limit,
            total,
            count: data.length
        },
        data
    };
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findById(id);
});
const updateProduct = (id, updatedProduct) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndUpdate(id, updatedProduct, { new: true });
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.productService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
