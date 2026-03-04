"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
router.post('/create', 
// auth(ENUM_USER_ROLE.ADMIN),
// validateRequest(ProductValidation.createProductZodSchema),
product_controller_1.productController.createProduct);
router.get('/', 
// auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
product_controller_1.productController.getAllProducts);
router.get('/:id', 
// auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
product_controller_1.productController.getProductById);
router.patch('/:id', 
// auth(ENUM_USER_ROLE.ADMIN),
product_controller_1.productController.updateProduct);
router.delete('/:id', 
// auth(ENUM_USER_ROLE.ADMIN),
product_controller_1.productController.deleteProduct);
exports.ProductRoutes = router;
