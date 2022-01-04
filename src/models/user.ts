import { hashSync, compareSync } from 'bcrypt';
import client from '../database';
export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    password: string;
};

const { CRYPT_PASSWORD: pepper, SALT_ROUNDS } = process.env;

export class UserStore {
    async create({ firstname, lastname, password }: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';

            const hash = hashSync(password + pepper, parseInt(SALT_ROUNDS!));

            const result = await conn.query(sql, [firstname, lastname, hash]);

            const user: User = result.rows[0];

            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Unable to create user ${firstname} ${lastname}. Error: ${err}`);
        }
    }

    async authenticate({ firstname, lastname, password }: User): Promise<User | null> {
        const conn = await client.connect();
        // TODO: double check this
        const sql = 'SELECT password FROM users WHERE firstname=($1) AND lastname($2)';

        const result = await conn.query(sql, [firstname, lastname]);

        console.log(password + pepper);

        if (result.rows.length) {
            const user: User = result.rows[0];

            console.log(user);

            if (compareSync(password + pepper, user.password)) {
                return user;
            }
        }

        return null;
    }

    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`unable get users: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`unable show user ${id}: ${err}`);
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';

            const result = await conn.query(sql, [id]);

            const product = result.rows[0];

            conn.release();

            return product;
        } catch (err) {
            throw new Error(`unable delete user (${id}): ${err}`);
        }
    }
}
