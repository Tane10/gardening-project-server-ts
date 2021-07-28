/* eslint-disable no-process-env */
import {AddressInfo} from 'net';

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import {Server} from './server';
import {RoutesService} from './routes';
import logger from './logger';

dotenv.config();

const routeService = new RoutesService();
const server = new Server(routeService);


async function start(): Promise<void> {

  await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(() => {
    const app = server.getApp();

    app.server.listen(8000, 'localhost', () => {
      const address = app.server.address();
      const port = typeof address === 'string' ? address : address?.port;
      logger.info(`Running on ${(address as AddressInfo).address} on port ${port}`);

    });
    app.on('error', (err) => {
      logger.error(`app has errored: ${err}`);
      process.exit(1);
    });

  }).catch((err) => {
    logger.error(`DB auth failed: ${err}`);
    throw err;
  });
}

start();
