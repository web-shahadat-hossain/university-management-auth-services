import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../../middleware/validateRequest';
import AcademicFacultyValidation from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation),
  academicFacultyController.createAcademicFaculty
);
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation),
  academicFacultyController.updateAcademicFaculty
);
router.delete('/:id', academicFacultyController.deleteAcademicFaculty);
router.get('/', academicFacultyController.getAllAcademicFaculty);

export const academicFacultyRouters = {
  router,
};
