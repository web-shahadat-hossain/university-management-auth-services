import { RequestHandler } from 'express';
import { academicSemesterServices } from './academicSemester.services';

const createAcademicSemesterController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterServices.createAcademicSemester(
      academicSemesterData
    );

    res.status(200).send({
      status: true,
      message: 'Academic Semester created successfully !',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const academicSemesterController = {
  createAcademicSemesterController,
};
