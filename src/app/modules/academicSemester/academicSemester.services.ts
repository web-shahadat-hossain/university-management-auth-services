import httpStatus from 'http-status';
import apiError from '../../../errors/apiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constants';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemester } from './academicSemester.model';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload?.title] !== payload.code) {
    throw new apiError(httpStatus.BAD_REQUEST, 'involved semester code');
  }
  const result = await academicSemester.create(payload);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemester,
};
