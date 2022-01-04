import { Router } from 'express';
import { getOrders, getOrder, createOrder, deleteOrder } from '../../controllers/order';

const orders = Router();

orders.get('/', getOrders);

orders.get('/:id', getOrder);

orders.post('/', createOrder);

orders.delete('/:id', deleteOrder);

export default orders;
