import { Router } from 'express';
import { registerUser, loginUser, logoutUser,isLoggedIn } from '../controllers/userController.js';
import { jwtVerify } from '../middlewares/authMiddleware.js';
import { optionalJwtVerify } from '../middlewares/optionalAuthMiddleware.js';

const userRouter = Router();

// Route for user registration
userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(jwtVerify, logoutUser);
userRouter.route('/isloggedin').get(optionalJwtVerify, isLoggedIn);
export default userRouter;