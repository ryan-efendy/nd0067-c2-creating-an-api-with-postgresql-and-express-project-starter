import { hashSync, compareSync } from 'bcrypt';
import client from '../database';
export type User = {
    id?: number;
    username: string;
    password_digest: string;
};

const { CRYPT_PASSWORD: pepper, SALT_ROUNDS } = process.env;

export class UserStore {
    async create({ username, password_digest }: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *';

            const hash = hashSync(password_digest + pepper, parseInt(SALT_ROUNDS!));

            const result = await conn.query(sql, [username, hash]);

            const user = result.rows[0];

            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Unable to create user ${username}. Error: ${err}`);
        }
    }

    async authenticate({ username, password_digest }: User): Promise<User | null> {
        const conn = await client.connect();
        const sql = 'SELECT password_digest FROM users WHERE username=($1)';

        const result = await conn.query(sql, [username]);

        console.log(password_digest + pepper);

        if (result.rows.length) {
            const user = result.rows[0];

            console.log(user);

            if (compareSync(password_digest + pepper, user.password_digest)) {
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

    async show(id: string): Promise<User> {
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

    async delete(id: string): Promise<User> {
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

    async edit(id: string, { username, password_digest }: User): Promise<User> {
        try {
            const sql = 'UPDATE articles (username, password_digest) VALUES($2, $3) WHERE id=($1) RETURNING *';
            const conn = await client.connect();

            const hash = hashSync(password_digest + pepper, parseInt(SALT_ROUNDS!));
            const result = await conn.query(sql, [id, username, hash]);

            const user = result.rows[0];

            conn.release();

            return user;
        } catch (err) {
            throw new Error(`Could not update user id ${id} with username: ${username}. Error: ${err}`);
        }
    }
}
