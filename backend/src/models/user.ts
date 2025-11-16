import { Role } from '../enums/role.enum';
import mongoose, { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  telephone: String,
  role: String,
});

const User = model('users', UserSchema);

export default User;
