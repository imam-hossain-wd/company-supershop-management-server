//pagination and filtering helper 

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

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

const calculatePagination = (options: IOptions): IOptionsResult => {
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

export const paginationHelpers = {
  calculatePagination,
};
