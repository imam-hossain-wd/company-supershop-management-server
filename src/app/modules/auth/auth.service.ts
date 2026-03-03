import httpStatus from 'http-status';
import {
  IChangePassword,
  ILogInUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUser,
} from './auth.interface';

import ApiError from '../../../errors/ApiError';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './auth.model';


const insertIntoDB = async (user: IUser): Promise<IUser | null> => {
  const isUserExist = await User.isUserExist(user.phoneNumber);
  if (isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is already exits');
  }
  const createdUser = await User.create(user);
  return createdUser;
};


const logInUser = async (userData: ILogInUser): Promise<ILoginUserResponse> => {

  const isUserExist = await User.isUserExist(userData.phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(userData.password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { _id, role, phoneNumber } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { _id, role, phoneNumber },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};


const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { _id } = verifiedToken;

  const isUserExist = await User.findOne({ _id });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};


//change password

const changePassword = async (userInfo: IChangePassword) => {
  const { oldPassword, newPassword, phoneNumber } = userInfo;

  const isUserExist = await User.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isMatchPassword = await User.isPasswordMatched(
    oldPassword,
    isUserExist.password
  );
  if (!isMatchPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is not matched');
  }

  // Hash the new password before updating
  const hashedPassword = await bcrypt.hash(newPassword, Number(config.bycrypt_salt_rounds));

  // Update the user with the hashed password
  const result = await User.findOneAndUpdate({ phoneNumber }, { password: hashedPassword }, { new: true });;
  return result;
};



export const authService = {
  insertIntoDB,
  logInUser,
  refreshToken,
  changePassword,
};