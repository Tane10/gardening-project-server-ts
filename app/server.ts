import restify from 'restify';
import corsMiddleware, { CorsMiddleware } from 'restify-cors-middleware2';

import { Controller } from './controllers/controller';

const cors: CorsMiddleware = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['Authorization'],
  exposeHeaders: ['Authorization']
});

export class Server {
  private app: restify.Server;

  constructor(controllers: Controller[]) {
    this.app = restify.createServer();
    this.app.pre(cors.preflight);
    this.app.use(cors.actual);
    this.app.use(restify.plugins.bodyParser());
    this.app.use(restify.plugins.authorizationParser());

    controllers.forEach((controller) => {
      controller.getRouter().applyRoutes(this.app);
    });
  }

  public getApp(): restify.Server {
    return this.app;
  }
}
