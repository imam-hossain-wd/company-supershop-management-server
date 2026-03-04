"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.get('/', 
// auth(
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.PATIENT,
//   ENUM_USER_ROLE.DOCTOR,
//   ENUM_USER_ROLE.DONOR
// ),
user_controller_1.UserController.getAllUsers);
router.get('/:id', 
// auth(
//   UserRole.PATIENT,
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.DOCTOR,
//   ENUM_USER_ROLE.DONOR
// ),
user_controller_1.UserController.getSingleUser);
router.patch('/:id', 
// auth(
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.PATIENT,
//   ENUM_USER_ROLE.DOCTOR,
//   ENUM_USER_ROLE.DONOR
// ),
user_controller_1.UserController.updateUser);
router.delete('/:id', 
// auth(
//   ENUM_USER_ROLE.ADMIN,
//   ENUM_USER_ROLE.SUPER_ADMIN,
//   ENUM_USER_ROLE.DOCTOR,
//   ENUM_USER_ROLE.DONOR,
//   ENUM_USER_ROLE.PATIENT
// ),
user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
