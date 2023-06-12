import { academicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constants/constants';
import { academicSemesterFilteringFiled } from './academicSemester.constants';

const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    next();
  }
);
const getAllAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    next();
  }
);

const getSingleAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await academicSemesterServices.getSingleAcademicSemester(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieved successfully!!!',
      data: result,
    });
    next();
  }
);

const updateAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
    next();
  }
);

export const academicSemesterController = {
  createAcademicSemesterController,
  getAllAcademicSemesterController,
  getSingleAcademicSemesterController,
  updateAcademicSemesterController,
};
