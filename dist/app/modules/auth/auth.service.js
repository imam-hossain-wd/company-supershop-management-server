"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_model_1 = __importDefault(require("./auth.model"));
const insertIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield auth_model_1.default.isUserExist(user.phoneNumber);
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User is already exits');
    }
    const createdUser = yield auth_model_1.default.create(user);
    return createdUser;
});
const logInUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield auth_model_1.default.isUserExist(userData.phoneNumber);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user does not exist');
    }
    if (isUserExist.password &&
        !(yield auth_model_1.default.isPasswordMatched(userData.password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const { _id, role, phoneNumber } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role, phoneNumber }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { _id } = verifiedToken;
    const isUserExist = yield auth_model_1.default.findOne({ _id });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
//change password
const changePassword = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, phoneNumber } = userInfo;
    const isUserExist = yield auth_model_1.default.isUserExist(phoneNumber);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isMatchPassword = yield auth_model_1.default.isPasswordMatched(oldPassword, isUserExist.password);
    if (!isMatchPassword) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is not matched');
    }
    // Hash the new password before updating
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bycrypt_salt_rounds));
    // Update the user with the hashed password
    const result = yield auth_model_1.default.findOneAndUpdate({ phoneNumber }, { password: hashedPassword }, { new: true });
    ;
    return result;
});
exports.authService = {
    insertIntoDB,
    logInUser,
    refreshToken,
    changePassword,
};
