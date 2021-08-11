import {AuthService} from './services/auth-service';
import logger from './logger';

export default class Api {
  public auth: AuthService;

  constructor() {
    this.auth = new AuthService(logger);
  }
}
