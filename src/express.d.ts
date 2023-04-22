import { User } from '@prisma/client';
import 'express';

declare global {
  namespace Express {
    export interface Request {
      user: Omit<User, 'password_sha256'>;
    }
  }
}
