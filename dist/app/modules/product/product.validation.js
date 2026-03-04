"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const createProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            message: 'name is required',
        }),
        category: zod_1.z.string({
            message: 'category is required',
        }),
        image: zod_1.z.string({
            message: 'image is required',
        }),
        availability: zod_1.z.boolean({
            message: 'availability is required',
        }),
        netWeight: zod_1.z.string({
            message: 'netWeight is required',
        }),
        description: zod_1.z.string({
            message: 'description is required',
        }),
        price: zod_1.z.number({
            message: 'price is required',
        }),
        quantity: zod_1.z.number({
            message: 'quantity is required',
        }),
    }),
});
exports.ProductValidation = {
    createProductZodSchema
};
