import mongoose from 'mongoose';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import apiError from '../../../errors/apiError';
import { academicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.Interface';
import { User } from './user.models';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utility';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

// student create services

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.Default_Student_Pass as string;
  }
  user.role = ENUM_USER_ROLE.STUDENT;

  const academicSemesterData = await academicSemester.findOne({
    _id: student.academicSemester,
  });
  const session = await mongoose.startSession();
  let newUserData = null;
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemesterData);
    user.id = id;
    student.id = id;

    // student create
    const createStudent = await Student.create([student], { session });
    if (!createStudent.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create student!');
    }

    // user create
    user.student = createStudent[0]?._id;
    const userCreate = await User.create([user], { session });

    if (!userCreate.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    newUserData = userCreate[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }

  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserData;
};

// faculty create services

const createFacultyService = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.Default_Faculty_Pass as string;
  }
  user.role = ENUM_USER_ROLE.FACULTY;

  const session = await mongoose.startSession();
  let newUserData = null;
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;
    // student create
    const createFaculty = await Faculty.create([faculty], { session });
    if (!createFaculty.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create faculty!');
    }

    // user create
    user.faculty = createFaculty[0]?._id;
    const userCreate = await User.create([user], { session });

    if (!userCreate.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    newUserData = userCreate[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }

  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserData;
};

// admin create services

const createAdminService = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.Default_Admin_Pass as string;
  }
  user.role = ENUM_USER_ROLE.ADMIN;

  const session = await mongoose.startSession();
  let newUserData = null;
  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;
    // admin create
    const createAdmin = await Admin.create([admin], { session });
    if (!createAdmin.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create Admin!');
    }

    // user create
    user.admin = createAdmin[0]?._id;
    const userCreate = await User.create([user], { session });

    if (!userCreate.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }
    newUserData = userCreate[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }

  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserData;
};

export const userServices = {
  createStudent,
  createFacultyService,
  createAdminService,
};
