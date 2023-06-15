import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { academicFacultyServices } from './academicFaculty.services';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constants/constants';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await academicFacultyServices.createAcademicFaculty(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create Academic Faculty Successfully!!!',
      data: result,
    });
  }
);
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const search = pick(req.query, ['searchTerm']);
    const paginationOptions = pick(req.query, paginationField);
    const result = await academicFacultyServices.getAllAcademicFaculty(
      paginationOptions,
      search
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty  retrieved successfully!!!',
      meta: result.meta,
      data: result.data,
    });
  }
);
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await academicFacultyServices.updateAcademicFaculty(
      id,
      updateData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Updated successfully!!!',
      meta: null,
      data: result,
    });
  }
);
const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicFacultyServices.deleteAcademicFaculty(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Deleted successfully!!!',
      meta: null,
      data: result,
    });
  }
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
