"use strict";
//pagination and filtering helper 
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
// const calculatePagination = (options: IOptions): IOptionsResult => {
//   const page = Number(options.page || 1);
//   const limit = Number(options.limit || 10);
//   const skip = (page - 1) * limit;
//   const sortBy = options.sortBy || 'createdAt';
//   const sortOrder = options.sortOrder || 'desc';
//   return {
//     page,
//     limit,
//     skip,
//     sortBy,
//     sortOrder,
//   };
// };
const calculatePagination = (options) => {
    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.max(1, Number(options.limit) || 10);
    const skip = (page - 1) * limit;
    return {
        page,
        limit,
        skip,
        sortBy: options.sortBy || 'createdAt',
        sortOrder: options.sortOrder === 'asc' ? 'asc' : 'desc',
    };
};
exports.paginationHelpers = {
    calculatePagination,
};
