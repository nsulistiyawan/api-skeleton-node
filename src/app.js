import './config';

import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use(bodyParser.json());

app.use('/', routes);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`Server started at http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
});

export default app;
