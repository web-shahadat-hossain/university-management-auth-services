import { academicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterServices.createAcademicSemester(
      academicSemesterData
    );
    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully !',
      data: result,
    });
  }
);

export const academicSemesterController = {
  createAcademicSemesterController,
};
