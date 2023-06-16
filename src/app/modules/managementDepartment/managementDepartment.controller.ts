import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constants/constants';
import { managementDepartmentServices } from './managementDepartment.services';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result =
      await managementDepartmentServices.createManagementDepartment(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create Management Department Successfully!!!',
      data: result,
    });
  }
);
const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const search = pick(req.query, ['searchTerm']);
    const paginationOptions = pick(req.query, paginationField);
    const result = await managementDepartmentServices.getAllDepartmentServices(
      paginationOptions,
      search
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department  retrieved successfully!!!',
      meta: result.meta,
      data: result.data,
    });
  }
);
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await managementDepartmentServices.updateDepartmentServices(
      id,
      updateData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Updated successfully!!!',
      meta: null,
      data: result,
    });
  }
);
const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await managementDepartmentServices.deleteDepartmentServices(
      id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Deleted successfully!!!',
      meta: null,
      data: result,
    });
  }
);

export const managementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
