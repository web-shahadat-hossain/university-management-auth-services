import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interface/error';

const CastErrorHandler = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err?.path,
      message: 'Invalid Object Id',
    },
  ];
  return {
    statusCode: 400,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default CastErrorHandler;
