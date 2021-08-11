/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-process-env */
import bcrypt from 'bcrypt';
import {inject, injectable} from 'inversify';
import jwt from 'jsonwebtoken';
import {Logger} from 'winston';
import {BadRequestError, ConflictError, UnauthorizedError} from 'restify-errors';
import * as dotenv from 'dotenv';

import User from '../model/user';
import UserSchema, {UserInterface} from '../schema/user-schema';

dotenv.config();


@injectable()
export class AuthService {
  protected saltRounds = 12;

  constructor(@inject('Logger') private logger: Logger) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  private async getUser(username: string): Promise<UserInterface[]> {
    try {
      return UserSchema.find({username});
    } catch (err) {
      throw new BadRequestError({statusCode: 400}, 'Bad Request');
    }
  }

  private async compare(password: string, dbHash: string): Promise<boolean> {
    return bcrypt.compare(password, dbHash);
  }

  // private async encodeToken(username: string, password: string, maxAge?: string): Promise<void> {
  //   return jwt.sign({username: `${username}`, password: `${password}`},
  //     process.env.JWT_KEY, {expiresIn: maxAge ? maxAge : '24h'});
  // }


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

  public async login(username: string, password: string): Promise<void> {
    try {
      const user = await this.getUser(username);
      const dbPassword = user[0].password;
      this.compare(password, dbPassword).then((match) => {
        if (match === false) {
          throw new UnauthorizedError({statusCode: 401}, 'Invalid details');
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
