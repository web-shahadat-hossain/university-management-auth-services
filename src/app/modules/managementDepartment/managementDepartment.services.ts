import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interface/common';
import { IPagination } from '../../../interface/pagination';
import { IAcademicSemesterFilter } from '../academicSemester/academicSemester.interface';
import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

// Management Department create service
const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

// Management Department get all service
const getAllDepartmentServices = async (
  Pagination: IPagination,
  filter: IAcademicSemesterFilter
): Promise<IGenericResponse<IManagementDepartment[]>> => {
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

  const result = await ManagementDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// update Management Department
const updateDepartmentServices = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
// delete Management Department
const deleteDepartmentServices = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete({ _id: id });
  return result;
};
export const managementDepartmentServices = {
  createManagementDepartment,
  getAllDepartmentServices,
  updateDepartmentServices,
  deleteDepartmentServices,
};
