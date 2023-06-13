import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidation
  ),
  academicDepartmentController.createAcademicDepartment
);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidation
  ),
  academicDepartmentController.updateAcademicDepartment
);
router.delete('/:id', academicDepartmentController.deleteAcademicDepartment);

router.get('/:id', academicDepartmentController.getSingleAcademicDepartment);

router.get('/', academicDepartmentController.getAllAcademicDepartment);

export const academicDepartmentRouter = {
  router,
};
