import { json } from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpError } from './common/HttpError';
import { accessTokenRoute } from './routers/access-tokens';
import { userRoute } from './routers/users';
import { registerRoute } from './utils';

export const app = express();

app.use(json({ limit: '1mb' }));

registerRoute(app, accessTokenRoute);
registerRoute(app, userRoute);

app.use(
  (error: Error, _request: Request, response: Response, next: NextFunction) => {
    if (error instanceof HttpError) {
      response.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof ZodError) {
      response.status(422).json({ message: error.errors });
    } else {
      response.status(500).json({ message: error.message });
    }
    next();
  }
);
