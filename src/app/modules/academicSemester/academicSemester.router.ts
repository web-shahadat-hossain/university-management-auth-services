import express from 'express';
// import { userController } from './user.controller';
import validateRequest from '../../../middleware/validateRequest';
import academicSemesterValidation from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';
// import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation),
  academicSemesterController.createAcademicSemesterController
);

export const academicSemesterRouters = {
  router,
};
