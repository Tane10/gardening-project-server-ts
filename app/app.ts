/* eslint-disable no-process-env */
import {AddressInfo} from 'net';


import 'reflect-metadata';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import {Logger} from 'winston';

import {Server} from './server';
import logger from './logger';
import {container} from './container';
import {AuthController} from './controllers/auth-controller';
import Common from './common';

dotenv.config();


container.bind<Logger>('Logger').toConstantValue(logger);

const server = new Server(
  [container.get<AuthController>(AuthController)],
);


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

// dirty way to make exports available to the frontend
export {Common};

start();
