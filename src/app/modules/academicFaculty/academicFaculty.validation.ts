import { z } from 'zod';

const AcademicFacultyValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
  }),
});

export default AcademicFacultyValidation;
