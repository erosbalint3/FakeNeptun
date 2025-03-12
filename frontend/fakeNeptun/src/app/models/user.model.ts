import { UserRole } from '../enums/user-role.enum';

export interface UserModel {
  name: string;
  username: string;
  email: string;
  role: UserRole;
  telephone: string;
}
