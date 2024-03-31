import {} from 'dotenv/config'
import dotenv from 'dotenv'

// SETTINGS
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import { Server as SocketIO, Socket } from 'socket.io'
import dbConnection from './database/database'

import {
  checkDataResults,
  getSingleSystem,
  proceduralRoute,
  saveProceduralToDatabase
} from './procedurals/routes/procedural.routes'
import loginRoute from './users/routes/login.routes'
import registerUserRoute from './users/routes/register.routes'
import generateShipDatabase from './ships/routes/buildShipDB.routes'
import { lookGraphs } from './technologyTrees/routes/graphs.routes'

const port = process.env.PORT ?? 8080

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new SocketIO(server)

// CONNECTING TO DB
dbConnection()

// SOCKET CONFIG (JUST INITIALITED FOR NOW)
io.on('connection', (socket: Socket) => {
  console.log('Socket hit with user connection.')
})

// MIDDLEWARES
app.use(express.json())
app.use(morgan(process.env.WORK_MODE || 'dev'))
app.use(cors())

// ROUTES
app.use(proceduralRoute)
app.use(saveProceduralToDatabase)
app.use(checkDataResults)
app.use(getSingleSystem)
app.use(loginRoute)
app.use(registerUserRoute)
app.use(generateShipDatabase)
app.use(lookGraphs)


// RUNNING UP
app.listen(port, () => {
  console.log(
    `⚡️[SERVER SAYS]: \nWELCOME! Server is listening on port ${port}.`
    
  )
})
