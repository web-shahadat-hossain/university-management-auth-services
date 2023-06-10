import { Response } from 'express';

type IResponseApi<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IResponseApi<T>) => {
  const responseData: IResponseApi<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
