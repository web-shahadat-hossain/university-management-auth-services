import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from './academicSemester.constants';
import apiError from '../../../errors/apiError';
import status from 'http-status';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      enum: academicSemesterTitle,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },

    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
  },

  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await academicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new apiError(status.CONFLICT, 'Academic Semester Already Exist!!');
  }
  next();
});

export const academicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'academicSemester',
  academicSemesterSchema
);
