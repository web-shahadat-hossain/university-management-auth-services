import { ZodError, ZodIssue } from 'zod';

export const validationZodErrorHandler = (error: ZodError) => {
  const errors = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
