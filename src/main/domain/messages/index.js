import { getThread } from "../threads";
import Message from './model'


export async function createMessage(content, threadId, user, sentAt) {
    const thread = await getThread(threadId)
    
    if (!thread) {
        throw new Error('Thread does not exists')
    }

    const message = {
        content,
        threadId,
        user,
        sentAt,
        savedAt: new Date()
    }

    return await Message.create(message)
}

export async function loadMessagesByThread(threadId, limit, skip) {
    const messages = await Message.find({ threadId }, {}, { limit, skip,  sort: { sentAt: -1 } })
    return messages.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
}

export async function loadNextMessagesByThread(threadId, datetime) {
    const messages = await Message.find({ threadId, savedAt: { $gt: datetime }})
    return messages.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
}