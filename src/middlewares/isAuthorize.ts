import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export const isAuthorize = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as jwt.JwtPayload;
            if (decoded?.id === parseInt(req.params.id)) {
                return next();
            }
        }
        res.status(401);
        res.json('User id does not match!');
        return;
    } catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
};
