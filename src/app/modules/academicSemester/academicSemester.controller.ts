import { academicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';

const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterServices.createAcademicSemester(
      academicSemesterData
    );
    next();
    res.status(200).send({
      status: true,
      message: 'Academic Semester created successfully !',
      data: result,
    });
  }
);

export const academicSemesterController = {
  createAcademicSemesterController,
};
