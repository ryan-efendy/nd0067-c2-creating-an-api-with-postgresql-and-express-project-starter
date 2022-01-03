import 'dotenv/config';
import { Pool } from 'pg';

const { ENV, POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, POSTGRES_DEV1_DB } =
    process.env;

console.log(`ENV: ${ENV}`);

let client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});

if (ENV == 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

if (ENV == 'dev1') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DEV1_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

export default client;
