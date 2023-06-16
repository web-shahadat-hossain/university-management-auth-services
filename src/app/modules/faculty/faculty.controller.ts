import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { paginationField } from '../../../constants/constants';
import { facultyFilteringFiled } from './faculty.constants';
import { facultyServices } from './faculty.services';

// all Student data get
const facultyAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilteringFiled);
  const paginationOptions = pick(req.query, paginationField);
  const result = await facultyServices.getAllFaculty(
    paginationOptions,
    filters
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty retrieved successfully!!!',
    meta: result.meta,
    data: result.data,
  });
});

// single faculty
const facultySingleData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyServices.getSingleFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty retrieved successfully!!!',
    data: result,
  });
});

// update faculty
const facultyUpdate = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await facultyServices.updateFaculty(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty updated successfully!!!',
    data: result,
  });
});
// delete faculty
const facultyDelete = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyServices.deleteFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty deleted successfully!!!',
    data: result,
  });
});

export const facultyController = {
  facultyAllData,
  facultySingleData,
  facultyUpdate,
  facultyDelete,
};
