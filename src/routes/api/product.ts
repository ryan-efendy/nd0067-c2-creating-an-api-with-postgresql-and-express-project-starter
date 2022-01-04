import { deleteProduct, getProduct, getProducts, createProduct } from '../../controllers/product';
import { Router } from 'express';
import { verifyAuthToken } from '../../middlewares/verifyAuthToken';

const products = Router();

products.get('/', getProducts);

products.get('/:id', getProduct);

products.post('/', verifyAuthToken, createProduct);

products.delete('/:id', deleteProduct);
export default products;
