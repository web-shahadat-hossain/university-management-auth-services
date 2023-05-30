import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// cors
app.use(cors())

//data parse
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// testing api
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!')
  next()
})

export default app
