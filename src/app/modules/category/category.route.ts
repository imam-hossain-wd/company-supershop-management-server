
import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();

router.post('/create', CategoryController.createCategory);
router.get('/', CategoryController.GetAllCategory);
router.patch('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);


export const CategoryRoutes = router;