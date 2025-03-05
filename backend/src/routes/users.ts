import { Router } from "express";
import userController from "../controllers/user.controller";


const router: Router = Router();

router.post('/users', userController.registerUser);
router.post('/users/login', userController.login);

export default router;