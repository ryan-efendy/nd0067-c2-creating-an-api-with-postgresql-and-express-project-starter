import client from '../database';

export type Article = {
    id?: string;
    title: string;
    content: string;
};

export class ArticleStore {
    async index(): Promise<Article[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM articles';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get articles. Error: ${err}`);
        }
    }

    async show(id: string): Promise<Article> {
        try {
            const sql = 'SELECT * FROM articles WHERE id=($1)';
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get article ${id}. Error: ${err}`);
        }
    }

    async create({ title, content }: Article): Promise<Article> {
        try {
            const sql = 'INSERT INTO articles (title, content) VALUES($1, $2) RETURNING *';
            const conn = await client.connect();

            const result = await conn.query(sql, [title, content]);

            const article = result.rows[0];

            conn.release();

            return article;
        } catch (err) {
            throw new Error(`Could not add article ${title}. Error: ${err}`);
        }
    }

    async edit(id: string, { title, content }: Article): Promise<Article> {
        try {
            const sql = 'UPDATE articles (title, content) VALUES($2, $3) WHERE id=($1) RETURNING *';
            const conn = await client.connect();

            const result = await conn.query(sql, [id, title, content]);

            const article = result.rows[0];

            conn.release();

            return article;
        } catch (err) {
            throw new Error(
                `Could not update article id ${id} with title ${title} and content ${content}. Error: ${err}`
            );
        }
    }

    async delete(id: string): Promise<Article> {
        try {
            const sql = 'DELETE FROM articles WHERE id=($1)';
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            const article = result.rows[0];

            conn.release();

            return article;
        } catch (err) {
            throw new Error(`Could not delete article with id ${id}. Error: ${err}`);
        }
    }
}
