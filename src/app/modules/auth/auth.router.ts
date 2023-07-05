import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import authRequest from '../../../middleware/authRequest';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginAuthZodSchema),

  authController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenZodSchema),
  authController.refreshToken
);
router.post(
  '/change-password',
  authRequest(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(authValidation.changePasswordZodSchema),
  authController.changePassword
);

export const authRouters = {
  router,
};
