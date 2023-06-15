import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../../middleware/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

router.delete('/:id', studentController.studentDelete);
router.patch(
  '/:id',
  validateRequest(studentValidation.createStudentZodSchema),
  studentController.studentUpdate
);
router.get('/:id', studentController.studentSingleData);
router.get('/', studentController.studentAllData);

export const studentRouters = {
  router,
};
