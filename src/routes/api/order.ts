import { Router } from 'express';
import { getOrders, getOrder, createOrder, deleteOrder, addProduct } from '../../controllers/order';

const orders = Router();

orders.get('/', getOrders);

orders.get('/:id', getOrder);

orders.post('/', createOrder);

orders.delete('/:id', deleteOrder);

orders.post('/:id/products', addProduct);

export default orders;
