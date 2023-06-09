import httpStatus from 'http-status';
import apiError from '../../../errors/apiError';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constants';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicSemester.interface';
import { academicSemester } from './academicSemester.model';
import { IPagination } from '../../../interface/pagination';
import { IGenericResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

// semester create service
const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload?.title] !== payload.code) {
    throw new apiError(httpStatus.BAD_REQUEST, 'involved semester code');
  }
  const result = await academicSemester.create(payload);
  return result;
};

// get all semester services

const getAllAcademicSemester = async (
  Pagination: IPagination,
  filter: IAcademicSemesterFilter
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // pagination code start here
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatorPagination(Pagination);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // searchTerm code start here
  const { searchTerm, ...filterData } = filter;

  const searchAndFilterCondition = [];

  if (searchTerm) {
    searchAndFilterCondition.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // filter data

  if (Object.keys(filterData).length) {
    searchAndFilterCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition =
    searchAndFilterCondition.length > 0
      ? { $and: searchAndFilterCondition }
      : {};

  const result = await academicSemester
    .find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await academicSemester.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// single semester services
const getSingleAcademicSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await academicSemester.findOne({ _id: id });
  return result;
};

// update semester services
const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload?.title &&
    academicSemesterTitleCodeMapper[payload?.title] !== payload.code
  ) {
    throw new apiError(httpStatus.BAD_REQUEST, 'involved semester code');
  }
  const result = await academicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
// delete semester services
const deleteAcademicSemester = async (id: string) => {
  const result = await academicSemester.findByIdAndDelete({ _id: id });
  return result;
};

export const academicSemesterServices = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
