import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyValidation } from './faculty.validation';

const router = express.Router();

router.delete('/:id', facultyController.facultyDelete);
router.patch(
  '/:id',
  validateRequest(facultyValidation.createFacultyZodSchema),
  facultyController.facultyUpdate
);
router.get('/:id', facultyController.facultySingleData);
router.get('/', facultyController.facultyAllData);

export const facultyRouters = {
  router,
};
