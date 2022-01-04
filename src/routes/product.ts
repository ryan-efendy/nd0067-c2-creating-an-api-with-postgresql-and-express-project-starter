import { deleteProduct, getProduct, getProducts, createProduct } from './../controllers/product';
import { Router } from 'express';

const products = Router();

products.get('/', getProducts);

products.get('/:id', getProduct);

products.post('/', createProduct);

products.delete('/:id', deleteProduct);
export default products;
