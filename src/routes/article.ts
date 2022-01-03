import { Request, Response, Application } from 'express';
import { ArticleStore } from '../models/article';

const store = new ArticleStore();

const index = async (_req: Request, res: Response) => {
    try {
        const articles = await store.index();
        res.json(articles);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const article = await store.show(req.params.id);
        res.json(article);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const article = await store.create(req.body);
        res.json(article);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const edit = async (req: Request, res: Response) => {
    try {
        const article = await store.edit(req.params.id, req.body);
        res.json(article);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const article = await store.delete(req.params.id);
        res.json(article);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const articles_routes = (app: Application) => {
    app.get('/articles', index);

    app.get('/articles/:id', show);

    app.post('/articles', create);

    app.put('/articles/:id', edit);

    app.delete('/articles/:id', destroy);
};
export default articles_routes;
