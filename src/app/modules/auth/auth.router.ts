import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';

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

export const authRouters = {
  router,
};
