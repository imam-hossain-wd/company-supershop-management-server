
import mongoose from "mongoose";
import { UserRole } from "../../../enums/user";

interface IDriver {
    vehicleNumber: String,
    licenseNumber: String
}

export type IUser = {
    isNew: unknown;
    isModified(arg0: string): unknown;
    _id?: mongoose.Types.ObjectId;
    name: string;
    email:string;
    phoneNumber: string;
    password:string;
    address: string;
    isActive: boolean;
    isVerified: boolean;
    needUpdateInfo: boolean;
    driverInfo?:IDriver,
    role:UserRole;
  };


