import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/users.service';

const userService = new UserService();

const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await userService.saveUser(req.body);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await userService.login(req.body);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await userService.changePassword(req.body);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const changeProfileData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await userService.changeProfileData(req.body);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default { registerUser, login, changePassword, changeProfileData };
