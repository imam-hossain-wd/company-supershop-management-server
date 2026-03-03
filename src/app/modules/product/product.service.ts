/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IFiltersProps, IPaginationProps, IProduct } from "./product.interface";
import { IGenericResponse } from "../../../interfaces/common";
import { productSearchAbleFields } from "./product.constants";
import { Product } from "./product.model";
import { Category } from "../category/category.model";


const createProduct = async (payload: IProduct): Promise<IProduct> => {
  
  const isCategoryExist = await Category.findById(payload.category);
  if (!isCategoryExist) {
    throw new Error('The specified category does not exist!');
  }
  const result = await Product.create(payload);
  const populatedResult = await result.populate('category');
  return populatedResult;
};

const getAllProducts = async (options:IPaginationProps,filters:IFiltersProps):Promise<IGenericResponse<IProduct[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  const { sortBy, sortOrder } = options;
   
const category = filtersData.category;
const minPrice = Number(filtersData.minPrice);
const maxPrice = Number(filtersData.maxPrice);

const andConditions = [];

const stringFields = productSearchAbleFields.filter(field => field !== 'price');
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
} else if (!isNaN(minPrice)) {
  andConditions.push({
    price: {
      $gte: minPrice,
    },
  });
} else if (!isNaN(maxPrice)) {
  andConditions.push({
    price: {
      $lte: maxPrice,
    },
  });
}


if (category) {
  andConditions.push({ category });
}

const whereConditions =
  andConditions.length > 0 ? { $and: andConditions } : {};

const sortConditions : {[key:string]:SortOrder} = {};

if(sortBy && sortOrder){
  //@ts-ignore
  sortConditions[sortBy]= sortOrder
}


const [data, total] = await Promise.all([
  Product.find(whereConditions).sort(sortConditions).skip(skip).limit(limit),
  Product.countDocuments(whereConditions),
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

};

const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id);
};


const updateProduct = async (id: string, updatedProduct: IProduct): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
};

const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const productService = {
    createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};