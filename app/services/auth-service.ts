import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {RestifyHttpErrorOptions} from 'restify-errors';


export class AuthService {

  protected saltRounds = 12;
  constructor() {

  }


  private hashPassword(password: string, callback: (error: Error, hash: string) => void): void {
    bcrypt.hash(password, this.saltRounds, (error: Error, hash) => {
      callback(error, hash);
    });
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

}
