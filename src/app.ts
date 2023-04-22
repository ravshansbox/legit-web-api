import { json } from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { authRoute } from './routers/auth';
import { userRoute } from './routers/users';
import { registerRoute } from './utils';

export const app = express();

app.use(json({ limit: '1mb' }));

registerRoute(app, authRoute);
registerRoute(app, userRoute);

app.use(
  (error: Error, _request: Request, response: Response, next: NextFunction) => {
    const message = error instanceof ZodError ? error.errors : error.message;
    response.status(500).json({ message });
    next();
  }
);
