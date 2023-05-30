import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import server from '../src/app/modules/users/user.services'
// cors
app.use(cors())

//data parse
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// testing api
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  server.createUserServices({
    role: 'student',
    id: '999',
    password: '',
  })
  res.send('Server is running!')
  next()
})

export default app
