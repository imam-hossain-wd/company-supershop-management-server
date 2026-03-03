
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { RequestHandler } from "express";
import pick from "../../../shared/pick";
import { IUser } from "../auth/auth.interface";
import { userSearchAbleFields } from "./user.constants";




const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
    const options = pick(req.query, ['sortBy', 'sortOrder', 'page', 'limit']);
    const filters = pick(req.query, userSearchAbleFields);
    const result = await UserService.getAllUsers(options, filters);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Retrived all users successfully',
        data: result,
    });
});


// const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
//   const result = await UserService.getAllUsers();
//   sendResponse<IUser[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Retrived all users successfully',
//     data: result,
//   });
// });


const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await UserService.getSingleUser(id);
    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Retrived single user successfully',
        data: result,
    });
});

const updateUser: RequestHandler = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await UserService.updateUser(id, updatedData);
    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "update user successfully",
        data: result,
    });
});

const deleteUser: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserService.deleteUser(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully !',
        data: result
    });
});




export const UserController = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,

}