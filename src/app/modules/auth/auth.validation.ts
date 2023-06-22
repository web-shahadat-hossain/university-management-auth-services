import { z } from 'zod';

const loginAuthZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required ' }),
  }),
});

export const authValidation = {
  loginAuthZodSchema,
  refreshTokenZodSchema,
};
