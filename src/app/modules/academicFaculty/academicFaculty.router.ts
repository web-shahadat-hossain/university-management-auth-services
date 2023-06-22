import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../../middleware/validateRequest';
import AcademicFacultyValidation from './academicFaculty.validation';
import authRequest from '../../../middleware/authRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation),
  authRequest(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicFacultyController.createAcademicFaculty
);
router.patch(
  '/:id',
  authRequest(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  validateRequest(AcademicFacultyValidation),
  academicFacultyController.updateAcademicFaculty
);
router.delete(
  '/:id',
  authRequest(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicFacultyController.deleteAcademicFaculty
);
router.get(
  '/',
  authRequest(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  academicFacultyController.getAllAcademicFaculty
);

export const academicFacultyRouters = {
  router,
};
