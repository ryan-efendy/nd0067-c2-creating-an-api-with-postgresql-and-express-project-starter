import { Router } from 'express';
import { getOrdersByUser } from '../../controllers/order';
import { createUser, authenticate, getUsers, getUser, deleteUser } from '../../controllers/user';
import { verifyAuthToken } from '../../middlewares/verifyAuthToken';

const users = Router();

users.post('/', verifyAuthToken, createUser);

users.post('/authenticate', authenticate);

users.get('/', verifyAuthToken, getUsers);

users.get('/:id', verifyAuthToken, getUser);

users.delete('/:id', deleteUser);

users.get('/:id/orders', verifyAuthToken, getOrdersByUser);

export default users;
