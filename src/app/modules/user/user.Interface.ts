import { Model } from 'mongoose';

export type IUser = {
  role: string;
  id: string;
  password: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
