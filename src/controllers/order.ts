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
