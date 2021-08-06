/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-process-env */
import bcrypt from 'bcrypt';
import {inject, injectable} from 'inversify';
import jwt, { } from 'jsonwebtoken';
import {Logger} from 'winston';
import {ConflictError, UnauthorizedError} from 'restify-errors';

import User from '../model/user';
import UserSchema, {UserInterface} from '../schema/user-schema';


@injectable()
export class AuthService {
  protected saltRounds = 12;

  constructor(@inject('Logger') private logger: Logger) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  private async getUser(username: string): Promise<UserInterface[]> {
    return UserSchema.find({username});
  }

  private async compare(password: string, dbHash: string): Promise<boolean> {
    return bcrypt.compare(password, dbHash);
  }

  public checkIfVaild(token: string): void {
    jwt.verify(token, process.env.JWT_KEY);
  }


  public async signUpUser(user: User): Promise<void> {
    try {
      const {
      fullname,
      username,
      email,
      type,
      avatar,
      disabled,
      lastLoginIn,
      loginType} = user;

      let {password} = user;

      const detailValidation = await this.getUser(username);

      if (detailValidation.length === 0) {
        const getHash = await this.hashPassword(user.password);
        password = getHash;

        const newUser = new UserSchema({
          fullname,
          username,
          password,
          email,
          type,
          avatar,
          disabled,
          loginType,
        });

        newUser.save().then((res) => {
          this.logger.info(res);
        })
          .catch((err) => {
            this.logger.error(err);
          });
      } else {
        throw new ConflictError({
          statusCode: 409,
        }, 'Duplicated user details');
      }

    } catch (err) {
      this.logger.error(err);
      throw err;
    }

  }

  public async login(username: string, password: string): Promise<any> {
    try {
      const user = await this.getUser(username);
      const dbPassword = user[0].password;

      this.compare(password, dbPassword).then((match) => {
        if (!match) {
          throw new UnauthorizedError({statusCode: 401}, 'Invaild details');
        }

      }).catch((err) => {
        throw err;
      });

    } catch (err) {
      this.logger.error(err);
      throw err;
    }


  }


}
