
import mongoose, { Model } from "mongoose";
import { UserRole } from "../../../enums/user";

interface IDriver {
    vehicleNumber: String,
    licenseNumber: String
}

export interface IUser {
    _id: string;
    isNew?: unknown;
    isModified(arg0: string): unknown;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    address: string;
    isActive: boolean;
    isVerified: boolean;
    needUpdateInfo: boolean;
    role: UserRole;
    driverInfo?: IDriver
}


export type ILogInUser = {
    phoneNumber: string;
    password: string;
};

export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
};

export type IRefreshTokenResponse = {
    accessToken: string;
};

export type IChangePassword = {
    oldPassword: string;
    newPassword: string;
    phoneNumber: string;
};


export interface IUserModel extends Model<IUser> {
    isUserExist(identifier: string): Promise<IUser | null>;
    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>;
}



