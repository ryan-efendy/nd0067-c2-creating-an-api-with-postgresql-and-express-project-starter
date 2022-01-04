import { Router } from 'express';
import { createUser, authenticate, getUsers, getUser, deleteUser } from '../../controllers/user';

const users = Router();

users.post('/', createUser);

users.post('/authenticate', authenticate);

users.get('/', getUsers);

users.get('/:id', getUser);

users.delete('/:id', deleteUser);

// users.put(':/id', isAuthorize, async (req: Request, res: Response) => {
//     const user = await store.edit(req.params.id, req.body);
//     res.json(user);
// });

export default users;
