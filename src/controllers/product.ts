import { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

export const getProducts = async (_req: Request, res: Response) => {
    try {
        // const products = await store.index();
        // res.json(products);
        const product: Product = {
            id: 1,
            name: 'Product 1',
            price: 100,
            category: 'Category 1'
        };
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await store.show(+req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await store.create(req.body);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await store.delete(+req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};
