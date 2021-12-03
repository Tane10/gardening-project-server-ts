import mongoose, { Schema, Types } from 'mongoose';

import { LoginType } from '../model/user';

export interface UserInterface extends Document {
  _id?: Types.ObjectId;
  fullname?: string;
  username: string;
  password: string;
  email: string;
  type: string;
  avatar?: string;
  disabled?: string;
  lastLoginIn?: Date;
  loginType?: LoginType;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    fullname: { type: String },
    username: { type: String },
    password: { type: String },
    email: { type: String },
    type: { type: String },
    avatar: { type: String },
    disabled: { type: Boolean },
    loginType: { type: LoginType }
  },
  { timestamps: true }
);

export default mongoose.model<UserInterface>('Users', UserSchema);
