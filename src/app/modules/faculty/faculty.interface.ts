import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';

type INames = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IFaculty = {
  id: string;
  name: INames;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'B+' | 'O+' | 'AB+' | 'A-' | 'B-' | 'O-' | 'AB-';
  designation: 'Professor ' | 'Lecturer';
  profileImage: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};
export type IFacultyFilter = {
  searchTerm?: string;
  gender?: string;
  bloodGroup?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  dateOfBirth?: string;
  emergencyContactNo?: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
