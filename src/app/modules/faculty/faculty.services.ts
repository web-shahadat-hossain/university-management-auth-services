import { IPagination } from '../../../interface/pagination';
import { IGenericResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import mongoose, { SortOrder } from 'mongoose';
import apiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { User } from '../user/user.models';
import { facultySearchableFields } from './faculty.constants';
import { IFaculty, IFacultyFilter } from './faculty.interface';
import { Faculty } from './faculty.model';

// get all semester services
const getAllFaculty = async (
  Pagination: IPagination,
  filter: IFacultyFilter
): Promise<IGenericResponse<IFaculty[]>> => {
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
      $or: facultySearchableFields.map(field => ({
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

  const result = await Faculty.find(whereCondition)

    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments(whereCondition);
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
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ _id: id })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// update semester services
const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const exist = await Faculty.findOne({ id });
  if (!exist) {
    throw new apiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const { name, ...studentData } = payload;
  const updateStudentData: Partial<IFaculty> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id: id }, updateStudentData, {
    new: true,
  })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
// delete semester services
const deleteFaculty = async (id: string) => {
  const session = await mongoose.startSession();
  let result = null;
  try {
    session.startTransaction();
    await Faculty.findOneAndDelete({ id: id }, { session });

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

export const facultyServices = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
