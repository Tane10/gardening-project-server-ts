/* eslint-disable no-process-env */

import 'reflect-metadata';
import { Request, Response, Next } from 'restify';
import router, { Router } from 'restify-router';
import { injectable } from 'inversify';

import { AuthService } from '../services/auth-service';
import { User } from '../model/user';

import { Controller } from './controller';

@injectable()
export class AuthController implements Controller {
  public router: Router;

  constructor(private authService: AuthService) {
    this.router = new Router();

    this.router.post(`/login`, (req: Request, res: Response, next: Next) => {
      return this.login(req, res, next);
    });

    this.router.post(`/signup`, (req: Request, res: Response, next: Next) => {
      return this.signUp(req, res, next);
    });

    this.router.get(`/ping`, (req: Request, res: Response) => {
      res.send('pong');
    });
  }

  public login = async (
    req: Request,
    res: Response,
    next: Next
  ): Promise<void> => {
    try {
      if (req.body.username && req.body.password) {
        this.authService
          .login(req.body.username, req.body.password)
          .then((token) => res.send(token))
          .catch((err) => {
            throw err;
          });
      }
      if (req.headers.authorization) {
        console.log('token');
      }
    } catch (err) {
      next(err);
    }
  };

  public signUp = async (
    req: Request,
    res: Response,
    next: Next
  ): Promise<void> => {
    try {
      const user: User = req.body;
      await this.authService.signUpUser(user);
    } catch (err) {
      next(err);
    }
  };

  public getRouter(): router.Router {
    return this.router;
  }

  public getMountPath(): string {
    return '/auth';
  }
}
