import { getThread } from "../threads";
import Message from './model'


export async function createMessage(content, threadId, user, sentAt, eventId, url) {
    const thread = await getThread(threadId)

    if (!thread) {
        throw new Error('Thread does not exists')
    }

    const message = {
        content,
        threadId,
        user,
        sentAt,
        savedAt: new Date(),
        eventId,
        url
    }

    return await Message.create(message)
}

export async function loadMessagesByThread(threadId, { limit, skip, search }) {
    let messages = []
    if (search && search.trim().length > 0) {
        messages = await Message.find({ threadId, content: { $regex: `.*${search}.*`, $options: 'i' } })
    } else {
        messages = await Message.find({ threadId }, {}, { limit, skip, sort: { sentAt: -1 } })
    }

    return messages.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
}

export async function loadNextMessagesByThread(threadId, datetime) {
    const messages = await Message.find({ threadId, savedAt: { $gt: datetime } })
    return messages.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
}