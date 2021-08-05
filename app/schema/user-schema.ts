import mongoose, {Schema} from 'mongoose';

import {UserType, LoginType} from '../model/user';


interface UserInterface extends Document {
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


const UserSchema: Schema = new Schema({
  fullname: {type: String},
  username: {type: String},
  password: {type: String},
  email: {type: String},
  type: {type: UserType},
  avatar: {type: String},
  disabled: {type: Boolean},
  loginType: {type: LoginType},
}, {timestamps: true});


export default mongoose.model<UserInterface>('Users', UserSchema);
