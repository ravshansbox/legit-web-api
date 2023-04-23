import { Router } from 'express';
import { registerRoute, Route } from '../../utils';
import { createAccessToken } from './createAccessToken';

const handler = Router();

registerRoute(handler, createAccessToken);

export const accessTokenRoute: Route = {
  method: 'use',
  path: '/access-tokens',
  handler,
};
