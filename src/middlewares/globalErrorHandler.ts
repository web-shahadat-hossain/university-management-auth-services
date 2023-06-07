import { ErrorRequestHandler } from 'express'
import config from '../config'
import { IGenericErrorMessage } from '../interface/error'
import { validationErrorHandler } from '../errors/validationErrorHandler'
import apiError from '../errors/apiError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'something went wrong!'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = validationErrorHandler(error)
    ;(statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorMessages = simplifiedError.errorMessages)
  } else if (error instanceof apiError) {
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
