import { sign } from 'jsonwebtoken';
import { z } from 'zod';
import { prismaClient } from '../../prismaClient';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  Route,
  createAsyncHandler,
  sha256,
  skip,
} from '../../utils';

const bodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const createTokenPair: Route = {
  method: 'post',
  path: '/login',
  handler: createAsyncHandler(async (request, response) => {
    const { username, password } = bodySchema.parse(request.body);
    const user = await prismaClient.user.findUnique({ where: { username } });
    if (user === null) {
      response.status(401).json({ message: 'Invalid username' });
      return;
    }
    if (user.password_sha256 !== sha256(password)) {
      response.status(401).json({ message: 'Invalid password' });
      return;
    }
    const tokenPayload = skip(user, ['password_sha256']);
    const access_token = sign(tokenPayload, ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    const refresh_token = sign(tokenPayload, REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });
    response.status(201).json({ access_token, refresh_token });
  }),
};
