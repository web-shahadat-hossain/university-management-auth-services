import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import managementDepartmentValidation from './managementDepartment.validation';
import { managementDepartmentController } from './managementDepartment.controller';

const router = express.Router();

router.post(
  '/create-management-department',
  validateRequest(managementDepartmentValidation),
  managementDepartmentController.createManagementDepartment
);
router.patch(
  '/:id',
  validateRequest(managementDepartmentValidation),
  managementDepartmentController.updateManagementDepartment
);
router.delete(
  '/:id',
  managementDepartmentController.deleteManagementDepartment
);
router.get('/', managementDepartmentController.getAllManagementDepartment);

export const managementDepartmentRouters = {
  router,
};
