import {Schema} from 'mongoose';

const User: Schema = new Schema({
  name: {type: String},
  email: {type: String},
  password: {type: String},
  role: {type: Number},
});
