import { Role } from "../enums/role.enum";
import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String
});

const User = model('users', UserSchema);

export default User;