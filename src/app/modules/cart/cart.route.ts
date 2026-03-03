import { Router } from 'express';
import { CartController } from './cart.controller';



const router = Router();

// 🔹 Add product to cart
// Uses validateRequest to ensure data integrity
router.post(
    '/add-to-cart',
    CartController.addToCart
);

// 🔹 Get only the logged-in user's cart
router.get(
    '/my-cart',
    CartController.getMyCart
);

// 🔹 Clear the entire cart
router.delete(
    '/clear',
    CartController.clearMyCart
);

router.delete(
    '/:id',
    CartController.removeItemFromCart
);

export const CartRoutes = router;