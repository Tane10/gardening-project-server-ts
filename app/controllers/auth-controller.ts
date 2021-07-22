import {Request, Response} from 'restify';
import router, {Router} from 'restify-router';

import {Controller} from './controller';


export class AuthController implements Controller {
  public router: Router;

  constructor(protected mountPath: string) {
    this.router = new Router();

    this.router.post('/login', (req, res, next) => {
      return this.login;
    });

  }

  public login(req: Request, res: Response, next: Function): void {

  }


  public getRouter(): router.Router {
    return this.router;
  }

  public getMountPath(): string {
    return this.mountPath;
  }


}
