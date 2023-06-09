import { ok } from 'assert';
import { v4 } from 'uuid';
import { z } from 'zod';
import { HttpError } from '../../common/HttpError';
import { parseAccessToken } from '../../common/parseAccessToken';
import { prismaClient } from '../../prismaClient';
import { Route, createAsyncHandler, sha256, skip } from '../../utils';

const bodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const createUser: Route = {
  method: 'post',
  path: '/',
  handler: createAsyncHandler(async (request, response) => {
    const { user } = await parseAccessToken(request);
    ok(user.is_root, new HttpError('Root access is required', 403));
    const body = bodySchema.parse(request.body);
    const newUser = await prismaClient.user.create({
      data: {
        id: v4(),
        created_at: new Date(),
        is_root: false,
        password_sha256: sha256(body.password),
        username: body.username,
      },
    });
    response.status(201).json(skip(newUser, ['password_sha256']));
  }),
};
