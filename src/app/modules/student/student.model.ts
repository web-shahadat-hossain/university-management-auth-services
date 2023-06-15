import { Schema, model } from 'mongoose';
import { IStudent, StudentModel } from './student.interface';
import { bloodGroup, gender } from './student.constants';
const studentSchema = new Schema<IStudent, StudentModel>(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      require: true,
      type: {
        firstName: {
          type: String,
          require: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          require: true,
        },
      },
    },

    gender: {
      type: String,
      enum: gender,
      require: true,
    },
    dateOfBirth: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    contactNo: {
      type: String,
      require: true,
    },
    emergencyContactNo: {
      type: String,
      require: true,
    },
    presentAddress: {
      type: String,
      require: true,
    },
    permanentAddress: {
      type: String,
      require: true,
    },
    bloodGroup: {
      type: String,
      require: true,
      enum: bloodGroup,
    },

    guardian: {
      require: true,
      type: {
        fatherName: {
          type: String,
          require: true,
        },
        fatherOccupation: {
          type: String,
          require: true,
        },
        fatherContactNo: {
          type: String,
          require: true,
        },
        motherName: {
          type: String,
          require: true,
        },
        motherOccupation: {
          type: String,
          require: true,
        },
        motherContactNo: {
          type: String,
          require: true,
        },
        address: {
          type: String,
          require: true,
        },
      },
    },
    localGuardian: {
      require: true,
      type: {
        name: {
          type: String,
          require: true,
        },
        occupation: {
          type: String,
          require: true,
        },
        contactNo: {
          type: String,
          require: true,
        },
        address: {
          type: String,
          require: true,
        },
      },
    },
    profileImage: {
      type: String,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'academicSemester',
      require: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academicDepartment',
      require: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<IStudent, StudentModel>('Student', studentSchema);
