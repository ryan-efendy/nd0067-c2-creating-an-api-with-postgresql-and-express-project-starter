import express, { Request, Response } from 'express';
import pinoHttp from 'pino-http';
import routes from './routes';
import articles_routes from './routes/article';
import users from './routes/user';
import logger from './util/logger';

const app = express();

app.use(pinoHttp({ logger }));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => res.send('👋 Hello World!'));

app.get('/health', (_req: Request, res: Response) => res.send({ message: '👍' }));

app.use('/api', routes);

articles_routes(app);

app.use('/users', users);

export default app;
