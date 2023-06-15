import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interface/common';
import { IPagination } from '../../../interface/pagination';
import { IAcademicSemesterFilter } from '../academicSemester/academicSemester.interface';
import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFaculty } from './academicFaculty.model';

// Academic Faculty create service
const createAcademicFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await academicFaculty.create(payload);
  return result;
};

// Academic Faculty get all service
const getAllAcademicFaculty = async (
  Pagination: IPagination,
  filter: IAcademicSemesterFilter
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  // pagination code start here
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatorPagination(Pagination);
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // searchTerm code start here
  const { searchTerm } = filter;
  const whereCondition = searchTerm
    ? { $and: [{ title: { $regex: searchTerm, $options: 'i' } }] }
    : {};

  const result = await academicFaculty
    .find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await academicFaculty.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// update Academic Faculty
const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await academicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
// delete Academic Faculty
const deleteAcademicFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await academicFaculty.findByIdAndDelete({ _id: id });
  return result;
};
export const academicFacultyServices = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
