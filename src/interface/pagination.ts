import { SortOrder } from 'mongoose';

export type IPagination = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
