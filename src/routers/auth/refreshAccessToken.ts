import { sign, verify } from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  Route,
  createHandler,
} from '../../utils';

export const refreshAccessToken: Route = {
  method: 'post',
  path: '/refresh',
  handler: createHandler((request, response) => {
    const { refresh_token } = request.body;
    const decoded = verify(refresh_token, REFRESH_TOKEN_SECRET);
    const access_token = sign(decoded, ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    response.status(201).json({ access_token });
  }),
};
