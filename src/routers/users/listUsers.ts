import { ok } from 'assert';
import { HttpError } from '../../common/HttpError';
import { parseAccessToken } from '../../common/parseAccessToken';
import { omitProps } from '../../common/utils';
import { prismaClient } from '../../prismaClient';
import { Route, createAsyncHandler } from '../../utils';

export const listUsers: Route = {
  method: 'get',
  path: '/',
  handler: createAsyncHandler(async (request, response) => {
    const { user } = await parseAccessToken(request);
    ok(user.is_root, new HttpError('Root access is required', 403));
    const users = await prismaClient.user.findMany();
    response.json(users.map((user) => omitProps(user, ['password_sha256'])));
  }),
};
