import { createLogger, format, transports } from 'winston'
import path from 'path'

const { combine, timestamp, label, printf, prettyPrint } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${date.toDateString()} H:${hours}: M:${minute}: S:${second} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),

  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
})
const loggerError = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),

  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
})

export { logger, loggerError }

// logs winston success
