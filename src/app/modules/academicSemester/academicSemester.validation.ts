import { z } from 'zod';

const academicSemesterValidation = z.object({
  body: z.object({
    title: z.enum(['autumn', 'summer', 'fall'], {
      required_error: 'Title is required',
    }),
    year: z.number({ required_error: 'Year is required' }),
    code: z.enum(['01', '02', '03'], { required_error: 'Code  is required' }),
    startMonth: z.enum(
      [
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
      ],
      {
        required_error: 'Start Month is required',
      }
    ),
    endMonth: z.enum(
      [
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
      ],
      {
        required_error: 'End Month is required',
      }
    ),
  }),
});

export default academicSemesterValidation;
