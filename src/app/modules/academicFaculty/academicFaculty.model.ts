import { Schema, model } from 'mongoose';
import {
  IAcademicFaculty,
  academicFacultyModel,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export const academicFaculty = model<IAcademicFaculty, academicFacultyModel>(
  'academicFaculty',
  academicFacultySchema
);
