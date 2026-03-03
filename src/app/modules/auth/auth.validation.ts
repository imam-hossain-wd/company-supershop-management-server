import { z } from 'zod';
import { UserRole } from '../../../enums/user';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    email: z.string({ message: 'Email is required' }).email("Invalid email format"),
    phoneNumber: z.string({ message: 'Phone number is required' }),
    password: z.string({ message: 'Password is required' }).min(6, "Password must be at least 6 characters"),
    address: z.string({ message: 'Address is required' }),
    role: z.nativeEnum(UserRole, { message: 'Valid role is required' }),
    driverInfo: z.object({
      vehicleNumber: z.string({ message: 'Vehicle number is required' }),
      licenseNumber: z.string({ message: 'License number is required' }),
    }).optional(),
  }).refine((data) => {
    // If role is DRIVER, driverInfo must exist
    if (data.role === UserRole.DRIVER && !data.driverInfo) {
      return false;
    }
    return true;
  }, {
    message: "driverInfo is required when role is DRIVER",
    path: ["driverInfo"], 
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ message: 'Email or Phone is required' }),
    password: z.string({ message: 'Password is required' }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ message: 'Refresh Token is required' }),
  }),
});

const changePassWordZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ message: 'Email is required' }),
    oldPassword: z.string({ message: 'Old password is required' }),
    newPassword: z.string({ message: 'New password is required' }).min(6),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  loginUserZodSchema,
  refreshTokenZodSchema,
  changePassWordZodSchema,
};