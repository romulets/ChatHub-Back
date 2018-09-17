import * as github from '../../infra/github'
import Thread from './model'

export async function getThreads(projectId){
    return await Thread.find({ projectId: projectId}).exec()
}

export async function saveThread(threadData){
    const thread = new Thread(threadData)
    return await thread.save()
}

