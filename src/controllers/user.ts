import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserStore } from '../models/user';

const store = new UserStore();

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await store.create(req.body);
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET!);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const authenticate = async (req: Request, res: Response) => {
    try {
        const user = await store.authenticate(req.body);
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET!);
        res.json(token);
    } catch (err) {
        res.status(401);
        res.json(err);
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const user = await store.show(req.params.id);
    res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    const user = await store.delete(req.params.id);
    res.json(user);
};
