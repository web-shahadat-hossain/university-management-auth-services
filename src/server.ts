import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, loggerError } from './shared/logger';
import { Server } from 'http';
let server: Server;

// uncaught Exception start here
process.on('uncaughtException', err => {
  loggerError.error('uncaught Exception', err);
  process.exit(1);
});

// database Connected code start

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database Connected ');
    server = app.listen(config.port, () => {
      logger.info(`Example server listening on port ${config.port}`);
    });
  } catch (err) {
    loggerError.error(`Fail to database connect `);
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        loggerError.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main().catch(err => logger.error(err));

// Sigterm error handling code
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
