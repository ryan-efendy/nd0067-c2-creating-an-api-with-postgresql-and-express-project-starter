import { Router } from 'express';
import { getOrders, getOrder, createOrder, deleteOrder, addProduct } from '../../controllers/order';
import { verifyAuthToken } from '../../middlewares/verifyAuthToken';

const orders = Router();

orders.get('/', verifyAuthToken, getOrders);

orders.get('/:id', verifyAuthToken, getOrder);

orders.post('/', verifyAuthToken, createOrder);

orders.delete('/:id', verifyAuthToken, deleteOrder);

orders.post('/:id/products', verifyAuthToken, addProduct);

export default orders;
