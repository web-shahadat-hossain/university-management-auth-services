import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './middleware/globalErrorHandler'
import { userRouters } from './app/modules/users/user.router'
const app: Application = express()
// cors
app.use(cors())

//data parse
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// application router
app.use('/app/v1/users/', userRouters.router)

// testing api
app.get('/', async (req: Request, res: Response) => {
  res.send('Server is running!')
})
// global error handling
app.use(globalErrorHandler)

export default app
