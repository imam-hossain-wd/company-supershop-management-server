import { Router } from 'express';
import { productController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import {ProductValidation} from './product.validation'
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();

router.post('/create',
// auth(ENUM_USER_ROLE.ADMIN),
// validateRequest(ProductValidation.createProductZodSchema),
productController.createProduct);

router.get('/',
    // auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
     productController.getAllProducts);

router.get('/:id',
    // auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER),
     productController.getProductById);

router.patch('/:id',
// auth(ENUM_USER_ROLE.ADMIN),
productController.updateProduct);

router.delete('/:id',
    // auth(ENUM_USER_ROLE.ADMIN),
     productController.deleteProduct);

export const ProductRoutes = router;