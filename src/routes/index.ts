import { Router } from 'express';
import products from './product';
const routes = Router();

routes.use('/products', products);
export default routes;
