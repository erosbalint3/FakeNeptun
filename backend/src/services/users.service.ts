import mongoose, { Schema, ObjectId} from "mongoose";
import { UserSaveRequest } from "../models/PostRequests/UserSaveRequest";
import User from "../models/user";
import { Role } from "../enums/role.enum";
import { LoginRequest } from "../models/PostRequests/LoginRequest";

export class UserService {
    constructor() {}

    async saveUser(data: UserSaveRequest) {
        const user = {
            ...data,
            role: Role.STUDENT
        };
        const response = User.insertOne(user);
        return Promise.resolve(response);
    }

    async checkPassword(data: LoginRequest) {
        const response = await User.findOne({ email: data.email }).exec();
        console.log(data.password == response?.password)
    }
}