import { academicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constants/constants';

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
    const paginationOptions = pick(req.query, paginationField);
    const result = await academicSemesterServices.getAllAcademicSemester(
      paginationOptions
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

export const academicSemesterController = {
  createAcademicSemesterController,
  getAllAcademicSemesterController,
};
