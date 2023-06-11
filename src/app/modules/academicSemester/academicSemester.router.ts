import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import academicSemesterValidation from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation),
  academicSemesterController.createAcademicSemesterController
);
router.get(
  '/:id',
  academicSemesterController.getSingleAcademicSemesterController
);
router.get('/', academicSemesterController.getAllAcademicSemesterController);

export const academicSemesterRouters = {
  router,
};
