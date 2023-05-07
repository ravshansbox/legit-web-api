import { HttpError } from '../../common/HttpError';
import { fetchAccessToken } from '../../services/fetchAccessToken';
import { Route, createAsyncHandler } from '../../utils';

export const getAccessToken: Route = {
  method: 'get',
  path: '/:id',
  handler: createAsyncHandler(async (request, response) => {
    try {
      const accessToken = await fetchAccessToken(request.params.id);
      response.status(200).json(accessToken);
    } catch (error) {
      throw new HttpError('Not found', 404);
    }
  }),
};
