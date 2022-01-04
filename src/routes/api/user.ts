import { Router } from 'express';
import { createUser, authenticate, getUsers, getUser, deleteUser } from '../../controllers/user';

const users = Router();

users.post('/', createUser);

users.post('/authenticate', authenticate);

users.get('/', getUsers);

users.get('/:id', getUser);

users.delete('/:id', deleteUser);

export default users;
