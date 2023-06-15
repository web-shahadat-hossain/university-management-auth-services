import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { academicDepartmentServices } from './academicDepartment.services';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constants/constants';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await academicDepartmentServices.createAcademicDepartment(
      data
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create Academic Department Successfully!!!',
      data: result,
    });
  }
);

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const search = pick(req.query, ['searchTerm']);
    const paginationOptions = pick(req.query, paginationField);
    const result = await academicDepartmentServices.getAllAcademicDepartment(
      paginationOptions,
      search
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department  retrieved successfully!!!',
      meta: result.meta,
      data: result.data,
    });
  }
);

// single
const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicDepartmentServices.getSingleAcademicDepartment(
      id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department retrieved successfully!!!',
      data: result,
    });
  }
);

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await academicDepartmentServices.updateAcademicDepartment(
      id,
      updateData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Updated successfully!!!',
      meta: null,
      data: result,
    });
  }
);
const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicDepartmentServices.deleteAcademicDepartment(
      id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Deleted successfully!!!',
      meta: null,
      data: result,
    });
  }
);

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
  getSingleAcademicDepartment,
};
