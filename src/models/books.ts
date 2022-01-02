import client from '../database';

export type Book = {
    id: number;
    title: string;
    totalPages: number;
    author: string;
    type: string;
    summary: string;
};

export class BooksStore {
    async index(): Promise<Book[]> {
        let conn;
        try {
            conn = await client.connect();
            const sql = 'SELECT * FROM books';
            const result = await conn.query(sql);
            return result.rows;
        } catch (error) {
            throw new Error(`Could not get books. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async show(id: string): Promise<Book> {
        let conn;
        try {
            conn = await client.connect();
            const sql = 'SELECT * FROM books WHERE id=($1))}';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find book ${id}. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async create({ title, totalPages, author, type, summary }: Book): Promise<Book> {
        let conn;
        try {
            conn = await client.connect();
            const sql =
                'INSERT INTO books (title, total_pages, author, type, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const result = await conn.query(sql, [title, totalPages, author, type, summary]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not add new book ${title}. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }

    async delete(id: string): Promise<Book> {
        let conn;
        try {
            conn = await client.connect();
            const sql = 'DELETE FROM books WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete book ${id}. Error: ${error}`);
        } finally {
            if (conn) conn.release();
        }
    }
}
