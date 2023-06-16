import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constants';

const createAdminZodSchema = z.object({
  body: z
    .object({
      name: z
        .object({
          firstName: z.string(),
          middleName: z.string().optional(),
          lastName: z.string(),
        })
        .optional(),
      gender: z.enum([...gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      profileImage: z.string().optional(),
      managementDepartment: z.string().optional(),
    })
    .optional(),
});

export const adminValidation = {
  createAdminZodSchema,
};
