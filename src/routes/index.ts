import { Router } from 'express';
import products from './api/product';
import users from './api/user';

const routes = Router();

routes.use('/products', products);
routes.use('/users', users);
export default routes;
