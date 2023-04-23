import { Router } from 'express';
import { registerRoute, Route } from '../../utils';
import { createAccessToken } from './createAccessToken';
import { getAccessToken } from './getAccessToken';

const handler = Router();

registerRoute(handler, createAccessToken);
registerRoute(handler, getAccessToken);

export const accessTokenRoute: Route = {
  method: 'use',
  path: '/access-tokens',
  handler,
};
