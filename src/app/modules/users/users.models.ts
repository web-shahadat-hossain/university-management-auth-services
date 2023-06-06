import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.Interface'

type UserModel = Model<IUser, object>

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
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
