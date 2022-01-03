import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { isAuthorize, verifyAuthToken } from '../middlewares';
import { UserStore } from '../models/user';

const users = Router();

const store = new UserStore();

users.post('/', async (req: Request, res: Response) => {
    try {
        const user = await store.create(req.body);
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET!);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

users.post('/authenticate', async (req: Request, res: Response) => {
    try {
        const user = await store.authenticate(req.body);
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET!);
        res.json(token);
    } catch (err) {
        res.status(401);
        res.json(err);
    }
});

users.get('/', async (req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
});

users.get('/:id', async (req: Request, res: Response) => {
    const user = await store.show(req.params.id);
    res.json(user);
});

users.delete('/:id', verifyAuthToken, async (req: Request, res: Response) => {
    const user = await store.delete(req.params.id);
    res.json(user);
});

users.put(':/id', isAuthorize, async (req: Request, res: Response) => {
    const user = await store.edit(req.params.id, req.body);
    res.json(user);
});

export default users;
