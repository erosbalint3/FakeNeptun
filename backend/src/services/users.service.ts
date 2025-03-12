import mongoose, { Schema, ObjectId} from "mongoose";
import { UserSaveRequest } from "../models/PostRequests/UserSaveRequest";
import User from "../models/user";
import { Role } from "../enums/role.enum";
import { LoginRequest } from "../models/PostRequests/LoginRequest";
import { ChangePasswordRequest } from "../models/PostRequests/ChangePasswordRequest";
import { ChangeProfileDataRequest } from "../models/PostRequests/ChangeProfileDataRequest";

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

    async login(data: LoginRequest) {
        const response = await User.findOne({ email: data.email });
        return response;
    }

    async changePassword(data: ChangePasswordRequest) {
        const user = await User.findOne({ email: data.email });

        if (user) {
            user.password = data.password;
            user?.save();
        }
    }

    async changeProfileData(data: ChangeProfileDataRequest) {
        const user = await User.findOne({ email: data.email });

        if (user) {
            user.name = data.name;
            user.telephone = data.telephone;
            user.email = data.email;

            user.save();
        }

        return user;
    }
}