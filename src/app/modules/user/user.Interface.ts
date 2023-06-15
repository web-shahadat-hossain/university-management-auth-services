import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  role: string;
  id: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId | IFaculty;
  // admin?: Types.ObjectId | IAdmin;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
