import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@hxtickets/common';
import { createCharge } from './routes/new';

const app = express();
app.set('trust proxy',true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false
  })
);
app.use(currentUser);

app.use(createCharge);

app.all('*', async(req: Response,res: Request) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };