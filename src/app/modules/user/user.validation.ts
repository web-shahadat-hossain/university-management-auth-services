import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constants';

// student zod validation

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'Please Provide First Name',
        }),
        middleName: z.string({}).optional(),
        lastName: z.string({
          required_error: 'Please Provide Last Name',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Please Provide gender',
      }),
      dateOfBirth: z.string({
        required_error: 'Please Provide date Of Birth ',
      }),
      email: z.string({
        required_error: 'Email is Required ',
      }),
      contactNo: z.string({
        required_error: 'Contact Number is Required ',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is Required ',
      }),
      presentAddress: z.string({
        required_error: 'Present Address  is Required ',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is Required ',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {})
        .optional(),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father Name is required' }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father Contact Number is required',
        }),
        motherName: z.string({ required_error: 'Mather Name is required' }),
        motherOccupation: z.string({
          required_error: 'Mather Occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mather Contact Number is required',
        }),
        address: z.string({
          required_error: 'Father and Mather address is Required',
        }),
      }),

      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contactNo is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),
      profileImage: z.string().optional(),
      academicSemester: z.string({
        required_error: 'academic Semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'academic Department is required',
      }),
      academicFaculty: z.string({
        required_error: 'academic Faculty  is required',
      }),
    }),
  }),
});

// Faculty zod validation

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'Please Provide First Name',
        }),
        middleName: z.string({}).optional(),
        lastName: z.string({
          required_error: 'Please Provide Last Name',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Please Provide gender',
      }),
      dateOfBirth: z.string({
        required_error: 'Please Provide date Of Birth ',
      }),
      email: z.string({
        required_error: 'Email is Required ',
      }),
      contactNo: z.string({
        required_error: 'Contact Number is Required ',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is Required ',
      }),
      presentAddress: z.string({
        required_error: 'Present Address  is Required ',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is Required ',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {})
        .optional(),

      profileImage: z.string().optional(),
      academicDepartment: z.string({
        required_error: 'academic Department is required',
      }),
      academicFaculty: z.string({
        required_error: 'academic Faculty  is required',
      }),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
};
