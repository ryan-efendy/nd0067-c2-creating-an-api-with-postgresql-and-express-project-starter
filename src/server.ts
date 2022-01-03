import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import articles_routes from './handlers/article';

const app = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

articles_routes(app);

app.listen(3000, () => {
    console.log(`starting app on: ${address}`);
});
