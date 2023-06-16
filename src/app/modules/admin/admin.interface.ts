import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

type INames = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IAdmin = {
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
  profileImage?: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
};

export type IAdminFilter = {
  searchTerm?: string;
  gender?: string;
  bloodGroup?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  dateOfBirth?: string;
  emergencyContactNo?: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
