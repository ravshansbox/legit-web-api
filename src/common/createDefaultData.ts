import { v4 } from 'uuid';
import { prismaClient } from '../prismaClient';
import { sha256 } from '../utils';
import { DEFAULT_PASSWORD, DEFAULT_USERNAMES } from './constants';

export const createDefaultData = async () => {
  const usernames = DEFAULT_USERNAMES?.split(',');
  for (const username of usernames) {
    try {
      await prismaClient.user.create({
        data: {
          id: v4(),
          created_at: new Date(),
          username,
          password_sha256: sha256(DEFAULT_PASSWORD),
          is_root: true,
        },
      });
    } catch (error) {}
  }
};
