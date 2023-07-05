import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.Interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    role: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    passwordChangeAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isExistUser = async function (
  id
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { id },
    { password: 1, id: 1, needsPasswordChange: 1, role: 1 }
  );
};

userSchema.methods.matchPassword = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword);
};

userSchema.pre('save', async function (next) {
  // password hash
  this.password = await bcrypt.hash(
    this.password,
    Number(config.default_bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
