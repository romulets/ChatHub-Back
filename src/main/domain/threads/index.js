import * as github from '../../infra/github'
import Thread from './model'

export async function getThreadsFromRepository(repositoryId){
    return await Thread.find({ repositoryId: repositoryId}).exec()
}

export async function getThread(threadId){
    return await Thread.findById(threadId).exec()
}

export async function saveThread(threadData){
    const thread = new Thread(threadData)
    thread.createdAt = new Date()
    return await thread.save()
}

export async function updateThread(threadData){
    const thread = await getThread(threadData._id)
    thread.name = threadData.name;
    thread.createdAt = new Date()
    return await thread.save()
}
