import httpStatus from 'http-status';
import apiError from '../../../errors/apiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constants';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemester } from './academicSemester.model';
import { IPagination } from '../../../interface/pagination';
import { IGenericResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload?.title] !== payload.code) {
    throw new apiError(httpStatus.BAD_REQUEST, 'involved semester code');
  }
  const result = await academicSemester.create(payload);
  return result;
};

const getAllAcademicSemester = async (
  payload: IPagination
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatorPagination(payload);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await academicSemester
    .find({})
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await academicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const academicSemesterServices = {
  createAcademicSemester,
  getAllAcademicSemester,
};
