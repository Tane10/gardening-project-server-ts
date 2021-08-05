/* eslint-disable no-process-env */
import bcrypt from 'bcrypt';
import {inject, injectable} from 'inversify';
import jwt from 'jsonwebtoken';
import {Logger} from 'winston';

import User from '../model/user';
import UserSchema from '../schema/user-schema';


@injectable()
export class AuthService {
  protected saltRounds = 12;

  constructor(@inject('Logger') private logger: Logger) {
  }

  public compare(password: string, dbHash: string, callback: (error: string, match: boolean) => void): void {
    bcrypt.compare(password, dbHash, (err: Error, match: boolean) => {
      if (match) {
            // passwords match
        callback(null, true);
      } else {
            // passwords do not match
        callback('Invalid password match', null);
      }
    });
  }

  public checkIfVaild(token: string): void {
    jwt.verify(token, process.env.JWT_KEY);
  }

  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  public async signUpUser(user: User): Promise<void> {

    const {fullname,
      username,
      email,
      type,
      avatar,
      disabled,
      lastLoginIn,
      loginType} = user;

    let {password} = user;

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

  }

  // mads;


}
