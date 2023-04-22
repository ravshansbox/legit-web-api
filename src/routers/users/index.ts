import { Router } from 'express';
import { registerRoute, Route } from '../../utils';
import { createUser } from './createUser';

const handler = Router();

registerRoute(handler, createUser);

export const userRoute: Route = {
  method: 'use',
  path: '/users',
  handler,
};
