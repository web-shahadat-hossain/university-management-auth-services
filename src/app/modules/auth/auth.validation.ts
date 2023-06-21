import { z } from 'zod';

const loginAuthZodSchema = z.object({
  body: z
    .object({
      id: z.string({ required_error: 'Id is required' }),
      password: z.string({ required_error: 'Password is required' }),
    })
    .optional(),
});

export const authValidation = {
  loginAuthZodSchema,
};
