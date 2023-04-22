import { Router } from 'express';
import { registerRoute, Route } from '../../utils';
import { createTokenPair } from './createTokenPair';
import { refreshAccessToken } from './refreshAccessToken';

const handler = Router();

registerRoute(handler, createTokenPair);
registerRoute(handler, refreshAccessToken);

export const authRoute: Route = {
  method: 'use',
  path: '/auth',
  handler,
};
