export enum LoginType {
  Standard = 'standard',
  Google = 'google'
}

export interface User {
  fullname?: string;
  username: string;
  password: string;
  email: string;
  type: string;
  avatar?: string;
  disabled?: string;
  lastLoginIn?: Date;
  loginType?: LoginType;
}
