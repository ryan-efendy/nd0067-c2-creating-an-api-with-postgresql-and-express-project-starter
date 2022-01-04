import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        let conn;
        try {
            conn = await client.connect();
            const sql = 'SELECT * FROM Products';
            const result = await conn.query(sql);
            return result.rows;
        } catch (error) {
            throw new Error(`Could not get Products. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async show(id: number): Promise<Product> {
        let conn;
        try {
            conn = await client.connect();
            const sql = 'SELECT * FROM Products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find Product ${id}. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async create({ name, price }: Product): Promise<Product> {
        let conn;
        try {
            conn = await client.connect();
            const sql = 'INSERT INTO Products (name, price) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [name, price]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not add new Product. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async delete(id: number): Promise<Product> {
        let conn;
        try {
            conn = await client.connect();
            const sql = 'DELETE FROM Products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete Product ${id}. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }
}
