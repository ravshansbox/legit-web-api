import type { IncomingMessage } from 'node:http';
import { fetchAccessToken } from '../services/fetchAccessToken';
import { HttpError } from './HttpError';

export const parseAccessToken = async (request: IncomingMessage) => {
  const { authorization } = request.headers;
  if (authorization === undefined) {
    throw new HttpError('No Authorization header', 403);
  }
  const result = /Bearer (.+)/.exec(authorization);
  if (result === null) {
    throw new HttpError('Invalid Authorization header', 403);
  }
  const accessTokenId = result[1];
  try {
    return await fetchAccessToken(accessTokenId);
  } catch (error) {
    throw new HttpError('Invalid Access Token ID', 403);
  }
};
