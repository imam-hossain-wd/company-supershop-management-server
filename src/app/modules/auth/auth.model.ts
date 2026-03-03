import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import config from '../../../config';
import { UserRole } from "../../../enums/user";
import { IUser, IUserModel } from "./auth.interface";


// 🔹 Driver Sub Schema
const driverInfoSchema = new Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false } 
);


// 🔹 Main User Schema
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      index: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    needUpdateInfo: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.CUSTOMER,
    },

    driverInfo: {
      type: driverInfoSchema,
      required: function () {
        return this.role === UserRole.DRIVER;
      },
    },
  },
  {
    timestamps: true,
  }
);

//Pre-Save Hook: password hashing
UserSchema.pre(
  'save',
  async function (this: IUser) {
    if (this.isModified('password') || this.isNew) {
      this.password = await bcrypt.hash(
        this.password,
        Number(config.bycrypt_salt_rounds)
      );
    }
  }
);

//check user exit  Static Method
// UserSchema.statics.isUserExist = async function (
//   phoneNumber: string
// ): Promise<IUser | null> {
//   return await this.findOne(
//     { phoneNumber },
//     { _id: 1, password: 1, role: 1, phoneNumber: 1 }
//   );
// };

UserSchema.statics.isUserExist = async function (
  identifier: string
) {
  return await this.findOne({
    $or: [{ email: identifier }, { phoneNumber: identifier }],
  }).select('+password');
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};


const User = mongoose.model<IUser, IUserModel>('User', UserSchema);

export default User;
