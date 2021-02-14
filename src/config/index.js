import dotenv from 'dotenv';

import './db';

dotenv.config();

export default {
  app: {
    name: process.env.APP_NAME,
    env: process.env.APP_ENV,
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
  },
};
