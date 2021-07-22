import router, {Router} from 'restify-router';

export class RoutesService {
  private routerInstance: Router;

  constructor() {
    this.routerInstance = new Router();
  }

  public getRoutes(): router.Router {
    this.routerInstance.post('/login', (req, res, next) => {
      res.send('hello there');
    });
    return this.routerInstance;
  }


}
