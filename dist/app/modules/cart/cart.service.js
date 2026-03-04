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
exports.CartService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cart_model_1 = require("./cart.model");
const addToCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, product, quantity } = payload;
    // Check if item already exists in user's cart
    const existingItem = yield cart_model_1.Cart.findOne({ user, product });
    if (existingItem) {
        return yield cart_model_1.Cart.findOneAndUpdate({ user, product }, {
            $inc: { quantity: quantity },
            $set: { createdAt: new Date() }
        }, { new: true });
    }
    // If new item, create it
    return yield cart_model_1.Cart.create(payload);
});
const getMyCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.find({ user: userId }).populate('product');
});
const removeFromCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.findByIdAndDelete(id);
});
const clearCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItems = yield cart_model_1.Cart.find({ user: userId });
    if (cartItems.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cart is already empty!');
    }
    const result = yield cart_model_1.Cart.deleteMany({ user: userId });
    return {
        deletedCount: result.deletedCount,
    };
});
exports.CartService = {
    addToCart,
    getMyCart,
    removeFromCart,
    clearCart
};
