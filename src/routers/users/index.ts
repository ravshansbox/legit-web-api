import { Router } from 'express';
import { registerRoute, Route } from '../../utils';
import { createUser } from './createUser';
import { listUsers } from './listUsers';

const handler = Router();

registerRoute(handler, listUsers);
registerRoute(handler, createUser);

export const userRoute: Route = {
  method: 'use',
  path: '/users',
  handler,
};
