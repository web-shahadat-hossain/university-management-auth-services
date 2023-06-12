import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterValidation),
  academicSemesterController.createAcademicSemesterController
);
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterValidation),
  academicSemesterController.updateAcademicSemesterController
);
router.delete(
  '/:id',
  academicSemesterController.deleteAcademicSemesterController
);
router.get(
  '/:id',
  academicSemesterController.getSingleAcademicSemesterController
);

router.get('/', academicSemesterController.getAllAcademicSemesterController);

export const academicSemesterRouters = {
  router,
};
