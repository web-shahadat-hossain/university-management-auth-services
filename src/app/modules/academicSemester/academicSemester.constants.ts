import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
} from './academicSemester.interface';

export const academicSemesterTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterMonth: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchableFields: string[] = [
  'title',
  'code',
  'year',
];

export const academicSemesterFilteringFiled = [
  'searchTerm',
  'title',
  'code',
  'year',
];
