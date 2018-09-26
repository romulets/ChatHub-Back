import SocketIO from 'socket.io'
import { createMessage } from '../../domain/messages';

export function attachSocketToApp (app) {
  const io = SocketIO(app)

  io.on('connection', socket => {
    
    console.info('User connected')
    socket.on('disconnect', () => console.info('User disconnected'))

    socket.on('message:sent', async packet => await handleMessage(socket, packet))
  })
}

async function handleMessage(socket, packet) {
  const { content, threadId, user, sentAt } = packet
  const message = await createMessage(content, threadId, user, sentAt)
  console.info(`Broadcasting message:${threadId}`)
  socket.broadcast.emit(`message:${threadId}`, message)
}