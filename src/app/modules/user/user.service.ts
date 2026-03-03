/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../auth/auth.interface';
import User from '../auth/auth.model';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { userFilterableFields, userSearchAbleFields } from './user.constants';
import { SortOrder } from 'mongoose';




const getAllUsers = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filtersData } = filters;

  const andConditions: any[] = [];

  // 🔍 SEARCH
  if (searchTerm) {
    andConditions.push({
      $or: userSearchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // 🎯 FILTER
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // 🔀 SORTING
  const sortConditions: { [key: string]: 1 | -1 } = {};
  sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;

  // 🚀 EXECUTE QUERY
  const [data, total] = await Promise.all([
    User.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit),

    User.countDocuments(whereConditions),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      count: data.length,
    },
    data,
  };
};


// const getAllUsers = async (): Promise<IUser[] | null> => {
//   const result = await User.find();
//   return result;
// };



const getSingleUser = async (id: string): Promise<IUser | null> => {
  const isUserExits = await User.findOne({ _id: id });
  if (!isUserExits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user is not found');
  }
  const singleUser = await User.findOne({ _id: id });
  return singleUser;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};