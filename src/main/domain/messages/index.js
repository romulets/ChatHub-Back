import { getThread } from "../threads";
import Message from './model'


export async function createMessage(content, threadId, user) {
    const thread = await getThread(threadId)
    
    if (!thread) {
        throw new Error('Thread does not exists')
    }

    message = {
        content,
        threadId,
        user,
        createdAt: new Date()
    }

    return await Message.create(message)
}