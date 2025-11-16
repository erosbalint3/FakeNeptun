import mongoose, { Schema, ObjectId } from 'mongoose';
import { UserSaveRequest } from '../models/PostRequests/UserSaveRequest';
import User from '../models/user';
import { Role } from '../enums/role.enum';
import { LoginRequest } from '../models/PostRequests/LoginRequest';
import { ChangePasswordRequest } from '../models/PostRequests/ChangePasswordRequest';
import { ChangeProfileDataRequest } from '../models/PostRequests/ChangeProfileDataRequest';

export class UserService {
  constructor() {}

  async saveUser(data: UserSaveRequest) {
    const user = {
      ...data,
      role: Role.STUDENT,
    };
    const response = User.insertOne(user);
    return Promise.resolve(response);
  }

  async login(data: LoginRequest) {
    const user = await User.findOne({ email: data.email });

    if (!user) {
      throw new Error("Can't find user with that email!");
    }

    if (user && data.password) {
      if (user?.password !== data.password || user.email !== data.email) {
        throw new Error('Wrong email or password');
      }
    }

    return {
      email: user?.email,
      name: user?.name,
      role: user?.role,
      username: user?.username,
      telephone: user?.telephone,
    };
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
