import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    if (process.env.BYPASS_TOKEN_AUTH) {
        next();
    }

    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            jwt.verify(token, process.env.TOKEN_SECRET!);
            next();
        }
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    } catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
