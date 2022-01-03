import { Router, Request, Response } from 'express';
import { OrderStore } from '../models/order';

const orders = Router();

const store = new OrderStore();

orders.get('/', async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

orders.get('/:id', async (req: Request, res: Response) => {
    try {
        const order = await store.show(+req.params.id);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

orders.post('/', async (req: Request, res: Response) => {
    try {
        const order = await store.create(req.body);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

orders.delete('/:id', async (req: Request, res: Response) => {
    try {
        const order = await store.delete(+req.params.id);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

orders.post('/orders/:id/products', async (req: Request, res: Response) => {
    const { orderId, productId, quantity } = req.params;

    try {
        const addedProduct = await store.addProduct(+quantity, orderId, productId);
        res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

export default orders;
