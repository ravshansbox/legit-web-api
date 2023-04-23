import { HttpError } from '../../common/HttpError';
import { prismaClient } from '../../prismaClient';
import { Route, createAsyncHandler, skip } from '../../utils';

export const getAccessToken: Route = {
  method: 'get',
  path: '/:id',
  handler: createAsyncHandler(async (request, response) => {
    const result = await prismaClient.accessToken.findUnique({
      include: { user: true },
      where: { id: request.params.id },
    });
    if (result === null) {
      throw new HttpError('Not found', 404);
    }
    const { user, ...accessToken } = result;
    response
      .status(200)
      .json({ ...accessToken, user: skip(user, ['password_sha256']) });
  }),
};
