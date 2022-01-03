import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middlewares';
import { Book, BookStore } from '../models/book';

const store = new BookStore();

const index = async (_req: Request, res: Response) => {
    const books = await store.index();
    res.json(books);
};

const show = async (req: Request, res: Response) => {
    const book = await store.show(req.body.id);
    res.json(book);
};

const create = async (req: Request, res: Response) => {
    try {
        const book: Book = {
            title: req.body.title,
            author: req.body.author,
            total_pages: req.body.total_pages,
            summary: req.body.summary,
            type: req.body.type
        };

        const newBook = await store.create(book);
        res.json(newBook);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json({ err });
    }
};

const articleRoutes = (app: express.Application) => {
    app.get('/books', index);
    app.get('/books/:id', show);
    app.post('/books', verifyAuthToken, create);
    app.delete('/books', verifyAuthToken, destroy);
};

export default articleRoutes;
