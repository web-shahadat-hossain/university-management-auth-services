import express from 'express';
// import { userController } from './user.controller';
import validateRequest from '../../../middleware/validateRequest';
import academicSemesterValidation from './academicSemester.validation';
// import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(academicSemesterValidation)
  //   userController.createUserController
);

export const academicSemesterRouters = {
  router,
};
