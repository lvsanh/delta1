import 'reflect-metadata'
import { Action, BadRequestError, useKoaServer } from 'routing-controllers'
import setupDb from './db'
import UserController from './users/controller'
import MessageController from './messages/controller'
import ProjectController from './projects/controller'
import LoginController from './logins/controller'
import { verify } from './jwt'
import User from './users/entity'
import * as Koa from 'koa'
import {Server} from 'http'
import * as IO from 'socket.io'
import * as socketIoJwtAuth from 'socketio-jwt-auth'
import {secret} from './jwt'

const app = new Koa()
const server = new Server(app.callback())
export const io = IO(server)
const port = process.env.PORT || 4000

useKoaServer(app, {
  cors: true,
  controllers: [
    UserController,
    MessageController,
    ProjectController,
    LoginController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      
      if (token) {
        const {id} = verify(token)
        return User.findOneById(id)
      }
    }
    return undefined
  }
})

io.use(socketIoJwtAuth.authenticate({ secret }, async (payload, done) => {
  const user = await User.findOneById(payload.id)
  if (user) done(null, user)
  else done(null, false, `Invalid JWT user ID`)
}))

// Setup socket.io
io.on('connection', socket => {
  const username = socket.handshake.query.username
  console.log(`${username} connected`)
  const name = socket.request.user.firstName
  console.log(`User ${name} just connected`)

  socket.on('client:message', data => {
    console.log(`${data.username}: ${data.message}`)

    // message received from client, now broadcast it to everyone else
    socket.broadcast.emit('server:message', data)
  });

  socket.on('disconnect', () => {
    console.log(`${username} disconnected`)
    console.log(`User ${name} just disconnected`)
  })
})

// io.on('connect', socket => {
//   const name = socket.request.user.firstName
//   console.log(`User ${name} just connected`)

//   socket.on('disconnect', () => {
//     console.log(`User ${name} just disconnected`)
//   })
// })

setupDb()
  .then(_ => {
    server.listen(port)
    console.log(`Listening on port ${port}`)
  })
  .catch(err => console.error(err))