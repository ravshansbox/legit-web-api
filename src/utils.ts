import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import { createHash } from 'node:crypto';

export const {
  PORT = '80',
  ACCESS_TOKEN_SECRET = 'ACCESS_TOKEN_SECRET',
  REFRESH_TOKEN_SECRET = 'REFRESH_TOKEN_SECRET',
} = process.env;

type AsyncRequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void>;

export const createAsyncHandler = (
  handler: AsyncRequestHandler
): RequestHandler => {
  return (request, response, next) => {
    handler(request, response, next).catch(next);
  };
};

export const createHandler = (handler: RequestHandler): RequestHandler => {
  return (request, response, next) => {
    try {
      handler(request, response, next);
    } catch (error) {
      next(error);
    }
  };
};

export type Route = {
  method: 'use' | 'get' | 'post' | 'put' | 'delete';
  path: string;
  handler: RequestHandler | RequestHandler[];
};

export const registerRoute = (
  router: Router,
  { method, path, handler }: Route
) => {
  if (Array.isArray(handler)) {
    router[method](path, ...handler);
  } else {
    router[method](path, handler);
  }
};

export const sha256 = (value: string) => {
  return createHash('sha256').update(value).digest('hex');
};

export const objectKeys = <K extends string>(value: Record<K, unknown>) => {
  return Object.keys(value) as K[];
};

export const skip = <
  T extends Record<string, unknown>,
  K extends keyof T,
  S extends K,
  U extends Exclude<K, S>
>(
  value: T,
  keys: S[]
) => {
  return objectKeys(value).reduce((agg, key) => {
    if (!keys.includes(key as S)) {
      agg[key as U] = value[key as U];
    }
    return agg;
  }, {} as Record<U, T[U]>);
};
