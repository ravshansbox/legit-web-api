import { ok } from 'assert';
import { v4 } from 'uuid';
import { z } from 'zod';
import { authMiddleware } from '../../authMiddleware';
import { prismaClient } from '../../prismaClient';
import { Route, createAsyncHandler, sha256, skip } from '../../utils';

const bodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const createUser: Route = {
  method: 'post',
  path: '/',
  handler: [
    authMiddleware,
    createAsyncHandler(async (request, response) => {
      ok(request.user.is_root, 'Root access is required');
      const body = bodySchema.parse(request.body);
      const user = await prismaClient.user.create({
        data: {
          id: v4(),
          is_root: false,
          password_sha256: sha256(body.password),
          username: body.username,
        },
      });
      response.status(201).json(skip(user, ['password_sha256']));
    }),
  ],
};
