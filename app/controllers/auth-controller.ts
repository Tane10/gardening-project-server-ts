/* eslint-disable no-process-env */

import 'reflect-metadata';
import {Request, Response, Next} from 'restify';
import router, {Router} from 'restify-router';
import {injectable} from 'inversify';

import {AuthService} from '../services/auth-service';
import User from '../model/user';

import {Controller} from './controller';


@injectable()

export class AuthController implements Controller {
  public router: Router;
  // public authService: AuthService;

  constructor(private authService: AuthService) {
    this.router = new Router();

    this.router.post(`${process.env.BASE_URL}/login`, (req: Request, res: Response, next: Next) => {
      return this.login(req, res, next);
    });

    this.router.post(`${process.env.BASE_URL}/signup`, (req: Request, res: Response, next: Next) => {
      return this.signUp(req, res, next);
    });

    this.router.get(`/ping`, (req: Request, res: Response, next: Next) => {
      res.send('pong');
    });
  }

  public login(req: Request, res: Response, next: Next): void {
    res.send('login');
  }

  public async signUp(req: Request, res: Response, next: Next): Promise<void> {
    const user: User = req.body;
    await this.authService.signUpUser(user);
  }

  public getRouter(): router.Router {
    return this.router;
  }

  public getMountPath(): string {
    return '/auth';
  }


}


