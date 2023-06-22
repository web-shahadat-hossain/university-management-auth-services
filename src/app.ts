import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import routes from './routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

const app: Application = express();
// cors
app.use(cors());

// parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// application router
app.use('/api/v1', routes);

// testing api
app.get('/', async (req: Request, res: Response) => {
  res.send('Server is running!');
});
// global error handling
app.use(globalErrorHandler);

// not found route error handling

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    errorMessages: {
      path: req.originalUrl,
      message: 'API Not Found',
    },
  });
  next();
});

export default app;
