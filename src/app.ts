import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/user.router'
const app: Application = express()
// cors
app.use(cors())

//data parse
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// application router
app.use('/app/v1/users/', userRouter)

// testing api
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send('Server is running!')
  next()
})

export default app
