/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { CategoryRoutes } from '../modules/category/category.route';
// import { ProductRoutes } from '../modules/product/product.route';

const router = express.Router();

const moduleRoutes = [
  {

    path: '/auth',
    route: AuthRoutes,
  },
  {

    path: '/user',
    route: UserRoutes,
  },
  {

    path: '/category',
    route: CategoryRoutes,
  },

];


moduleRoutes.forEach(route => router.use(route.path, route.route));

export const routes = router;