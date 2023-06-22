import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { adminController } from './admin.controller';
import { adminValidation } from './admin.validation';

const router = express.Router();

router.delete('/:id', adminController.adminDelete);
router.patch(
  '/:id',
  validateRequest(adminValidation.createAdminZodSchema),
  adminController.adminUpdate
);
router.get('/:id', adminController.adminSingleData);
router.get('/', adminController.adminAllData);

export const adminRouters = {
  router,
};
