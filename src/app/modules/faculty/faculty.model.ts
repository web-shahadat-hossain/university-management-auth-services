import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';
import { bloodGroup, gender } from '../student/student.constants';

const facultySchema = new Schema<IFaculty, FacultyModel>(
  {
    id: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    gender: { type: String, enum: gender, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
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
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academicDepartment',
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);
