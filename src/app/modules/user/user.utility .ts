import { ENUM_USER_ROLE } from '../../../enums/user';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.models';

// student id generate

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: ENUM_USER_ROLE.STUDENT },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};
export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
) => {
  const lastStudentId = await findLastStudentId();
  const currentId = lastStudentId || (0).toString().padStart(5, '0');

  let studentIncrementId = (Number(currentId) + 1).toString().padStart(5, '0');

  studentIncrementId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${studentIncrementId}`;
  return studentIncrementId;
};

// faculty id generate

export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    { role: ENUM_USER_ROLE.FACULTY },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty?.id.substring(1) : undefined;
};

export const generateFacultyId = async () => {
  const lastFacultyId = await findLastFacultyId();
  const currentId = lastFacultyId || (0).toString().padStart(5, '0');
  let facultyIncrementId = (Number(currentId) + 1).toString().padStart(5, '0');

  facultyIncrementId = `F${facultyIncrementId}`;
  return facultyIncrementId;
};

// admin id generate

export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    { role: ENUM_USER_ROLE.ADMIN },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? lastAdmin?.id.substring(1) : undefined;
};

export const generateAdminId = async () => {
  const lastAdminId = await findLastAdminId();
  const currentId = lastAdminId || (0).toString().padStart(5, '0');
  let adminIncrementId = (Number(currentId) + 1).toString().padStart(5, '0');

  adminIncrementId = `A${adminIncrementId}`;
  return adminIncrementId;
};
