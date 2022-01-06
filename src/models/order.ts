import client from '../database';

export type Order = {
    id?: number;
    product_id: number;
    user_id: number;
    quantity: number;
    status: 'active' | 'complete';
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

    async create({ product_id, user_id, quantity, status }: Order): Promise<Order> {
        let conn;
        try {
            conn = await client.connect();
            const sql =
                'INSERT INTO Orders (product_id, user_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [product_id, user_id, quantity, status]);
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

    async getOrdersByUser(user_id: number): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM Orders WHERE user_id=($1)';
            const conn = await client.connect();

            const result = await conn.query(sql, [user_id]);

            const order = result.rows;

            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Could not find Order for userId ${user_id}. Error: ${err}`);
        }
    }

    async getOrdersByUserAndStatus(user_id: number, status: string): Promise<Order> {
        try {
            //TODO: double check this query
            const sql = 'SELECT * FROM Orders WHERE user_id=($1) AND status=($2)';
            const conn = await client.connect();

            const result = await conn.query(sql, [user_id, status]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Could not find Order with status ${status} for userId ${user_id}. Error: ${err}`);
        }
    }
}
