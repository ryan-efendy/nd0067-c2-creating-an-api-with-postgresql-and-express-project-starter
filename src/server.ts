import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import articles_routes from './routes/article';
import users from './routes/user';

const app = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

articles_routes(app);

app.use('/users', users);

app.listen(3000, () => {
    console.log(`starting app on: ${address}`);
});
