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

export const authRouters = {
  router,
};
