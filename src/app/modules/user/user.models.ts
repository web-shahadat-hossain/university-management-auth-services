import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.Interface';

const userSchema = new Schema<IUser>(
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
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
