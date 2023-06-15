import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  userController.createStudent
);

export const userRouters = {
  router,
};
