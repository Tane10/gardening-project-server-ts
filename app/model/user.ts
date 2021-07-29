import {Schema} from 'mongoose';

// const User: Schema = new Schema({
//   name: {type: String},
//   email: {type: String},
//   password: {type: String},
//   role: {type: Number},
// });

export enum UserType {
    User = 'user',
    Admin = 'admin',
    Demo = 'demo',
}


export enum LoginType {
    Standard = 'standard',
    Google = 'google',
}

export class User {
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
