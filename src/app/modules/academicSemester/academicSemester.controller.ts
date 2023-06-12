import { academicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constants/constants';
import { academicSemesterFilteringFiled } from './academicSemester.constants';
// create semester
const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterServices.createAcademicSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully !',
      data: result,
    });
  }
);

// all semester data get
const getAllAcademicSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicSemesterFilteringFiled);
    const paginationOptions = pick(req.query, paginationField);
    const result = await academicSemesterServices.getAllAcademicSemester(
      paginationOptions,
      filters
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully!!!',
      meta: result.meta,
      data: result.data,
    });
  }
);

// single semester
const getSingleAcademicSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicSemesterServices.getSingleAcademicSemester(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully!!!',
      data: result,
    });
  }
);

// update semester
const updateAcademicSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await academicSemesterServices.updateAcademicSemester(
      id,
      updateData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully!!!',
      data: result,
    });
  }
);
// delete semester
const deleteAcademicSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicSemesterServices.deleteAcademicSemester(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully!!!',
      data: result,
    });
  }
);

export const academicSemesterController = {
  createAcademicSemesterController,
  getAllAcademicSemesterController,
  getSingleAcademicSemesterController,
  updateAcademicSemesterController,
  deleteAcademicSemesterController,
};
