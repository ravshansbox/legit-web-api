import { v4 } from 'uuid';
import { z } from 'zod';
import { prismaClient } from '../../prismaClient';
import { Route, createAsyncHandler, sha256, skip } from '../../utils';

const bodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const createAccessToken: Route = {
  method: 'post',
  path: '/',
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
    const access_token = await prismaClient.accessToken.create({
      data: { id: v4(), created_at: new Date(), user_id: user.id },
    });
    response
      .status(201)
      .json({ ...access_token, user: skip(user, ['password_sha256']) });
  }),
};
