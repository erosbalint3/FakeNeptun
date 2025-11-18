import { UserService } from './users.service';
import User from '../models/user';
import { Role } from '../enums/role.enum';

jest.mock('../models/user');

describe('UserService', () => {
  let userService: UserService;
  const mockUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'John Doe',
    username: 'johndoe',
    telephone: undefined,
    role: Role.STUDENT,
  };

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe('saveUser', () => {
    it('should save a new user with STUDENT role', async () => {
      const userData = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'test@example.com',
        password: 'password123',
      };

      const mockInsertOne = jest.fn().mockResolvedValue({ insertedId: '123' });
      (User.insertOne as jest.Mock) = mockInsertOne;

      const result = await userService.saveUser(userData);

      expect(mockInsertOne).toHaveBeenCalledWith({
        ...userData,
        role: Role.STUDENT,
      });
      expect(result).toEqual({ insertedId: '123' });
    });
  });

  describe('login', () => {
    it('should successfully login with correct credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      (User.findOne as jest.Mock) = jest.fn().mockResolvedValue(mockUser);

      const result = await userService.login(loginData);

      expect(User.findOne).toHaveBeenCalledWith({ email: loginData.email });
      expect(result).toEqual({
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        username: mockUser.username,
        telephone: mockUser.telephone,
      });
    });

    it('should throw error if user not found', async () => {
      const loginData = {
        email: 'notfound@example.com',
        password: 'password123',
      };

      (User.findOne as jest.Mock) = jest.fn().mockResolvedValue(null);

      await expect(userService.login(loginData)).rejects.toThrow(
        "Can't find user with that email!"
      );
    });

    it('should throw error if password is incorrect', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      (User.findOne as jest.Mock) = jest.fn().mockResolvedValue(mockUser);

      await expect(userService.login(loginData)).rejects.toThrow('Wrong email or password');
    });
  });
});
