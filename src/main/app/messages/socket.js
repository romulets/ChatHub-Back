import SocketIO from 'socket.io'
import { createMessage } from '../../domain/messages';

export function attachSocketToApp (app) {
  const io = SocketIO(app)

  io.on('connection', socket => {
    
    console.log('User connected')
    socket.on('disconnect', () => console.log('User disconnected'))

    socket.on('message:sent', async packet => await handleMessage(socket, packet))
  })
}

async function handleMessage(socket, packet) {
  const { deliveryId, topicId } = packet
  const message = await createMessage(deliveryId, topicId, packet.message)
  console.log(`Broadcasting message:${deliveryId}-${topicId}`)
  socket.broadcast.emit(`message:${deliveryId}-${topicId}`, message)
}