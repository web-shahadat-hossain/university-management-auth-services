import { Model } from 'mongoose';
export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCode = '01' | '02' | '03';
export type IAcademicSemesterFilter = {
  searchTerm?: string;
};
export type IAcademicSemester = {
  title: IAcademicSemesterTitle;
  year: string;
  code: IAcademicSemesterCode;
  startMonth: IAcademicSemester;
  endMonth: IAcademicSemester;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
