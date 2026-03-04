"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const router = (0, express_1.Router)();
// 🔹 Add product to cart
// Uses validateRequest to ensure data integrity
router.post('/add-to-cart', cart_controller_1.CartController.addToCart);
// 🔹 Get only the logged-in user's cart
router.get('/my-cart', cart_controller_1.CartController.getMyCart);
// 🔹 Clear the entire cart
router.delete('/clear', cart_controller_1.CartController.clearMyCart);
router.delete('/:id', cart_controller_1.CartController.removeItemFromCart);
exports.CartRoutes = router;
