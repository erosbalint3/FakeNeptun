import { Router } from 'express';
import userController from '../controllers/user.controller';

const router: Router = Router();

router.post('/users', userController.registerUser);
router.post('/users/login', userController.login);
router.put('/users/change-password', userController.changePassword);
router.put('/users/change-profile-data', userController.changeProfileData);

export default router;
