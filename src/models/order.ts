import client from '../database';

export type Order = {
    id?: number;
    status: string;
    user_id: number;
};

export class OrderStore {
    async index(): Promise<Order[]> {
        let conn;
        try {
            conn = await client.connect();
            const sql = 'SELECT * FROM Orders';
            const result = await conn.query(sql);
            return result.rows;
        } catch (error) {
            throw new Error(`Could not get Orders. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async show(id: number): Promise<Order> {
        let conn;
        try {
            conn = await client.connect();
            const sql = 'SELECT * FROM Orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find Order ${id}. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async create({ status, user_id }: Order): Promise<Order> {
        let conn;
        try {
            conn = await client.connect();
            const sql = 'INSERT INTO Orders (status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [status, user_id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not add new Order. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async delete(id: number): Promise<Order> {
        let conn;
        try {
            conn = await client.connect();
            const sql = 'DELETE FROM Orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete Order ${id}. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await client.connect();

            const result = await conn.query(sql, [quantity, orderId, productId]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
}
