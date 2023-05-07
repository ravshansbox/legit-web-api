import { omitProps } from '../common/utils';
import { prismaClient } from '../prismaClient';

export const fetchAccessToken = async (accessTokenId: string) => {
  const { user, ...accessToken } =
    await prismaClient.accessToken.findUniqueOrThrow({
      include: { user: true },
      where: { id: accessTokenId },
    });
  return { accessToken, user: omitProps(user, ['password_sha256']) };
};
