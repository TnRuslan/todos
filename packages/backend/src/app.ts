import HttpErrorHandler from './helpers/httpErrorHandler';
import AppRouter from './routes';
import { StatusCodes } from './utils/const/statusCode';

import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import type { Express, Request, Response } from 'express';
import express from 'express';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Node!');
});

router.init();

app.use(HttpErrorHandler);

app.use('*', (req: Request, res: Response) => {
  res.sendStatus(StatusCodes.NotFound);
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
