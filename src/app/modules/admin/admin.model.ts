import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from '../student/student.constants';
import { AdminModel, IAdmin } from './admin.interface';

const facultySchema = new Schema<IAdmin, AdminModel>(
  {
    id: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    gender: { type: String, enum: gender, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    profileImage: {
      type: String,
    },
    designation: {
      type: String,
      enum: ['Professor', 'Lecturer'],
      required: true,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'ManagementDepartment',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Admin = model<IAdmin, AdminModel>('Admin', facultySchema);
