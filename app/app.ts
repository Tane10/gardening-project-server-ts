/* eslint-disable no-console */
import {AddressInfo} from 'net';


import {Server} from './server';
import {RoutesService} from './routes';


const routeService = new RoutesService();
const server = new Server(routeService);

const start = () => {
  const app = server.getApp();

  app.server.listen(8080, '0.0.0.0', () => {
    const address = app.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    console.log(address);
    console.log(`Running on ${(address as AddressInfo).address} on port ${port}`);
  });
  app.on('error', (err) => {
    console.log(err);
    process.exit(1);
  });


};

// eslint-disable-next-line no-void
void start();
