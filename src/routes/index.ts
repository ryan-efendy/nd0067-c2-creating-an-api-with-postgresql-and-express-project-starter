import { Router } from 'express';
import orders from './api/order';
import products from './api/product';
import users from './api/user';

const routes = Router();

routes.use('/products', products);
routes.use('/users', users);
routes.use('/orders', orders);
export default routes;
