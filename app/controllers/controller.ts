import router from 'restify-router';

export interface Controller {
  getRouter(): router.Router;
  getMountPath(): string;
}
