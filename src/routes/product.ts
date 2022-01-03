import { Router, Request, Response } from 'express';
import { ProductStore } from '../models/product';

const products = Router();

const store = new ProductStore();

products.get('/', async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

products.get('/:id', async (req: Request, res: Response) => {
    try {
        const product = await store.show(+req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

products.post('/', async (req: Request, res: Response) => {
    try {
        const product = await store.create(req.body);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

products.delete('/:id', async (req: Request, res: Response) => {
    try {
        const product = await store.delete(+req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});
export default products;
