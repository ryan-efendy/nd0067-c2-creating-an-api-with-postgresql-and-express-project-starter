import { Request, Response } from 'express';
import { OrderStore } from '../models/order';

const store = new OrderStore();

export const getOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await store.show(+req.params.id);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await store.create(req.body);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const order = await store.delete(+req.params.id);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const addProduct = async (req: Request, res: Response) => {
    const orderId = Number(req.params.id);
    const productId = Number(req.body.productId);
    const quantity = Number(req.body.quantity);

    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
    const status = (req.query.status as string) ?? null;
    try {
        const orders = status
            ? await store.getOrdersByUserAndStatus(+req.params.id, status)
            : await store.getOrdersByUser(+req.params.id);
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};
