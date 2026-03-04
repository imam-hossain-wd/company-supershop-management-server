"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRelationalFieldsMapper = exports.productFilterableFields = exports.productSearchAbleFields = void 0;
exports.productSearchAbleFields = ['name', 'category', 'price'];
exports.productFilterableFields = [
    'searchTerm',
    'minPrice',
    'maxPrice',
    'category'
];
exports.productRelationalFieldsMapper = {
    category: 'category',
};
