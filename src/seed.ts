import { v4 } from 'uuid';
import { prismaClient } from './prismaClient';
import { sha256 } from './utils';

const usernames = ['alisher', 'botir', 'ravshan'];
const password_sha256 = sha256('123456');

(async () => {
  for (const username of usernames) {
    await prismaClient.user.create({
      data: { id: v4(), is_root: true, password_sha256, username },
    });
  }
})().catch(console.error);
