import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interface/common';
import { IPagination } from '../../../interface/pagination';
import { IAcademicSemesterFilter } from '../academicSemester/academicSemester.interface';
import { IAcademicDepartment } from './academicDepartment.interface';
import { academicDepartment } from './academicDepartment.model';

// Academic Department create service
const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await academicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

// Academic Department get all service
const getAllAcademicDepartment = async (
  Pagination: IPagination,
  filter: IAcademicSemesterFilter
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
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

  const result = await academicDepartment
    .find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await academicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// single  Department services
const getSingleAcademicDepartment = async (id: string) => {
  const result = (await academicDepartment.findOne({ _id: id }))?.populate(
    'academicFaculty'
  );
  return result;
};

// update Academic Department
const updateAcademicDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
) => {
  const result = (
    await academicDepartment.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    })
  )?.populate('academicFaculty');
  return result;
};
// delete Academic Department
const deleteAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await academicDepartment.findByIdAndDelete({ _id: id });
  return result;
};
export const academicDepartmentServices = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
  getSingleAcademicDepartment,
};
