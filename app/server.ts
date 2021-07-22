import restify from 'restify';
import corsMiddleware, {CorsMiddleware} from 'restify-cors-middleware';

import {RoutesService} from './routes';

const cors: CorsMiddleware = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['Authorization'],
  exposeHeaders: ['Authorization'],
});

export class Server {
  private app: restify.Server;

  constructor(private routesService: RoutesService) {
    this.app = restify.createServer();
    this.app.pre(cors.preflight);
    this.app.use(cors.actual);
    this.routesService = new RoutesService();

  }

  public getApp(): restify.Server {
    const routes = this.routesService.getRoutes();
    routes.applyRoutes(this.app);
    return this.app;
  }


}

