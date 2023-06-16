import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { paginationField } from '../../../constants/constants';
import { adminFilteringFiled } from './admin.constants';
import { adminServices } from './admin.services';

// all admin data get
const adminAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilteringFiled);
  const paginationOptions = pick(req.query, paginationField);
  const result = await adminServices.getAllAdmin(paginationOptions, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully!!!',
    meta: result.meta,
    data: result.data,
  });
});

// single admin
const adminSingleData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminServices.getSingleAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully!!!',
    data: result,
  });
});

// update admin
const adminUpdate = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await adminServices.updateAdmin(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully!!!',
    data: result,
  });
});
// delete admin
const adminDelete = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminServices.deleteAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully!!!',
    data: result,
  });
});

export const adminController = {
  adminAllData,
  adminSingleData,
  adminUpdate,
  adminDelete,
};
