import { User } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { ok } from 'node:assert';
import { ACCESS_TOKEN_SECRET, createHandler } from './utils';

export const authMiddleware = createHandler((request, _response, next) => {
  const accessToken = request.headers.authorization;
  ok(accessToken, 'Authorization header is required');
  request.user = verify(accessToken, ACCESS_TOKEN_SECRET) as User;
  next();
});
