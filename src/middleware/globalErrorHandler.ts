/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-console

import { ErrorRequestHandler } from 'express';
import config from '../config';
import { IGenericErrorMessage } from '../interface/error';
import { validationErrorHandler } from '../errors/validationErrorHandler';
import apiError from '../errors/apiError';
import { loggerError } from '../shared/logger';
import { ZodError } from 'zod';
import { validationZodErrorHandler } from '../errors/validationZodErrorHandler';
import CastErrorHandler from '../errors/CastErrorHandler';
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.error('Global Error Handler.......', error)
    : loggerError.error('Global Error Handler......', error);

  // error pattern

  let statusCode = 500;
  let message = 'something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  // mongos validationErrorHandler code start

  if (error?.name === 'ValidationError') {
    const simplifiedError = validationErrorHandler(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorMessages = simplifiedError.errorMessages);
  } else if (error instanceof ZodError) {
    const simplifiedError = validationZodErrorHandler(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorMessages = simplifiedError.errorMessages);
  } else if (error instanceof apiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error.name === 'CastError') {
    const simplifiedError = CastErrorHandler(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorMessages = simplifiedError.errorMessages);
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
