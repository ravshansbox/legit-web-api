import { app } from './app';
import { PORT } from './utils';

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
