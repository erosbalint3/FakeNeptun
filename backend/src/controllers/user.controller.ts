import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/users.service";
import { json } from "body-parser";

const userService = new UserService();

const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log(req);
        const response = await userService.saveUser(req.body);
        console.log(response);
        res.status(200).json(response);
    } catch(error) {
        next(error);
    }
}

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await userService.checkPassword(req.body);
        res.status(200).json(response);
    } catch(error) {
        next(error);
    }
}

export default { registerUser, login };