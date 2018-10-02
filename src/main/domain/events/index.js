import * as github from '../../infra/github'
import Message from '../messages/model' 
import { getThreadsFromRepository } from '../threads'

//import MessagesIndex from '../messages/index' 

export async function syncEvents(userName, repoName){
    const events = await github.getEvents(userName, repoName);
    if(events){
        console.log(events[0].repo.id)
        const threads = await getThreadsFromRepository(events[0].repo.id)
        //events.forEach((event) => {
        //console.log(threads)
        for(let i in events){
            const event = events[i];
            if(event.type == "PushEvent"){
                const dbEvent = await Message.find({eventId: event.id})
                //console.log(dbEvent)
                if(dbEvent.length === 0){
                    const messageContent = `Um push foi feito no repositório por ${event.actor.login}: ${event.payload.commits[0].message}`;
                    //MessagesIndex.createMessage(messageContent)
                    console.log(messageContent)
                }
    
            }
        }
        //});
    }
    
    return events
}