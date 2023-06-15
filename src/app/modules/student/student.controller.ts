import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { studentsServices } from './student.services';
import { paginationField } from '../../../constants/constants';
import { studentFilteringFiled } from './student.constants';

// all Student data get
const studentAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilteringFiled);
  const paginationOptions = pick(req.query, paginationField);
  const result = await studentsServices.getAllStudents(
    paginationOptions,
    filters
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully!!!',
    meta: result.meta,
    data: result.data,
  });
});

// single Student
const studentSingleData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentsServices.getSingleStudents(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully!!!',
    data: result,
  });
});

// update Student
const studentUpdate = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await studentsServices.updateStudents(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully!!!',
    data: result,
  });
});
// delete Student
const studentDelete = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentsServices.deleteStudent(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully!!!',
    data: result,
  });
});

export const studentController = {
  studentAllData,
  studentSingleData,
  studentUpdate,
  studentDelete,
};
