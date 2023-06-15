import { IPagination } from '../../../interface/pagination';
import { IGenericResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import mongoose, { SortOrder } from 'mongoose';
import { IStudent, IStudentFilter } from './student.interface';
import { studentSearchableFields } from './student.constants';
import { Student } from './student.model';
import apiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { User } from '../user/user.models';

// get all semester services
const getAllStudents = async (
  Pagination: IPagination,
  filter: IStudentFilter
): Promise<IGenericResponse<IStudent[]>> => {
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
      $or: studentSearchableFields.map(field => ({
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

  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereCondition);
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
const getSingleStudents = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ _id: id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// update semester services
const updateStudents = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const exist = await Student.findOne({ id });
  if (!exist) {
    throw new apiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;
  const updateStudentData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      (updateStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`;
      (updateStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id: id }, updateStudentData, {
    new: true,
  })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
// delete semester services
const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession();
  let result = null;
  try {
    session.startTransaction();
    await Student.findOneAndDelete({ id: id }, { session })
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');

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

export const studentsServices = {
  getAllStudents,
  getSingleStudents,
  updateStudents,
  deleteStudent,
};
