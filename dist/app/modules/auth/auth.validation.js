"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const user_1 = require("../../../enums/user");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: 'Name is required' }),
        email: zod_1.z.string({ message: 'Email is required' }).email("Invalid email format"),
        phoneNumber: zod_1.z.string({ message: 'Phone number is required' }),
        password: zod_1.z.string({ message: 'Password is required' }).min(6, "Password must be at least 6 characters"),
        address: zod_1.z.string({ message: 'Address is required' }),
        role: zod_1.z.nativeEnum(user_1.UserRole, { message: 'Valid role is required' }),
        driverInfo: zod_1.z.object({
            vehicleNumber: zod_1.z.string({ message: 'Vehicle number is required' }),
            licenseNumber: zod_1.z.string({ message: 'License number is required' }),
        }).optional(),
    }).refine((data) => {
        // If role is DRIVER, driverInfo must exist
        if (data.role === user_1.UserRole.DRIVER && !data.driverInfo) {
            return false;
        }
        return true;
    }, {
        message: "driverInfo is required when role is DRIVER",
        path: ["driverInfo"],
    }),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ message: 'Email or Phone is required' }),
        password: zod_1.z.string({ message: 'Password is required' }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ message: 'Refresh Token is required' }),
    }),
});
const changePassWordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ message: 'Email is required' }),
        oldPassword: zod_1.z.string({ message: 'Old password is required' }),
        newPassword: zod_1.z.string({ message: 'New password is required' }).min(6),
    }),
});
exports.AuthValidation = {
    createUserZodSchema,
    loginUserZodSchema,
    refreshTokenZodSchema,
    changePassWordZodSchema,
};
