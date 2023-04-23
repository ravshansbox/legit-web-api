import { app } from './app';
import { createDefaultData } from './common/createDefaultData';
import { HTTP_PORT } from './utils';

createDefaultData().then(() => {
  app.listen(HTTP_PORT, () => {
    console.info(`Listening on port ${HTTP_PORT}`);
  });
});
