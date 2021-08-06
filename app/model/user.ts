export enum UserType {
    User = 'user',
    Admin = 'admin',
    Demo = 'demo',
}


export enum LoginType {
    Standard = 'standard',
    Google = 'google',
}

export default class User {
  fullname?: string;
  username: string;
  password: string;
  email: string;
  type: UserType;
  avatar?: string;
  disabled?: string;
  lastLoginIn?: Date;
  loginType?: LoginType;
}
