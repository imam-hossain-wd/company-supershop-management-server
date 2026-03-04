"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 1800 // 1800 seconds = 30 minutes
    },
});
exports.Cart = (0, mongoose_1.model)('Cart', cartSchema);
