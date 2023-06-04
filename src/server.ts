import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, loggerError } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database Connected ')
    app.listen(config.port, () => {
      logger.info(`Example server listening on port ${config.port}`)
    })
  } catch (err) {
    loggerError.error(`Fail to database connect `)
  }
}
main().catch(err => logger.error(err))
