import bcrypt from 'bcrypt';
import {injectable} from 'inversify';
import jwt from 'jsonwebtoken';

@injectable()
export class AuthService {
  protected saltRounds = 12;

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


}
