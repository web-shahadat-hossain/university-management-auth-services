import { IPagination } from '../../../interface/pagination';
import { IGenericResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import mongoose, { SortOrder } from 'mongoose';
import apiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { User } from '../user/user.models';
import { IAcademicSemesterFilter } from '../academicSemester/academicSemester.interface';
import { IAdmin } from './admin.interface';
import { adminSearchableFields } from './admin.constants';
import { Admin } from './admin.model';

// get all admin services
const getAllAdmin = async (
  Pagination: IPagination,
  filter: IAcademicSemesterFilter
): Promise<IGenericResponse<IAdmin[]>> => {
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
      $or: adminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereCondition)

    .populate('managementDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// single admin services
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ _id: id }).populate(
    'managementDepartment'
  );

  return result;
};

// update admin services
const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const exist = await Admin.findOne({ id });
  if (!exist) {
    throw new apiError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  const { name, ...studentData } = payload;
  const updateStudentData: Partial<IAdmin> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id: id }, updateStudentData, {
    new: true,
  }).populate('managementDepartment');

  return result;
};
// delete admin services
const deleteAdmin = async (id: string) => {
  const session = await mongoose.startSession();
  let result = null;
  try {
    session.startTransaction();
    await Admin.findOneAndDelete({ id: id }, { session });

    result = await User.findOneAndDelete({ id: id }, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }

  return result;
};

export const adminServices = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
