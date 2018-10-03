import { Router } from 'express'
import errorHandler from '../error-handler';
import { loadMessagesByThread, loadNextMessagesByThread, createMessage } from '../../domain/messages';
import { getThreadsFromRepository } from '../../domain/threads';
import { findByGithubId } from '../../domain/repositories';

const router = Router({mergeParams: true})

router.post('/', async (req, res) => {
  try {
    //console.log(req.body)
    const repository = await findByGithubId(req.body.repository.id)
    const threads = await getThreadsFromRepository(repository.id)
    const mainThread = threads.filter((t) => t.name === "Main")[0]
        
    if(req.body.commits != null){
        //console.log(threads)
        //console.log(mainThread)

        const commits = req.body.commits
        //console.log(commits)
        for(let i in commits){
            const commit = commits[i]
            const userName = commit.author.username
            const content = `Um commit foi adicionado no repositório por ${userName}`
            const resp = await createMessage(content, mainThread._id, null, new Date())
            if(!resp){
                res.status(200).send(resp)
            }
        }
    } else if(req.body.issue != null && req.body.action === "opened"){
        
        const issue = req.body.issue
        const userName = issue.user.login;
        const content = `Um novo issue foi aberto por ${userName}`
        const resp = await createMessage(content, mainThread._id, null, new Date())
        if(!resp){
            res.status(200).send(resp)
        }
        
    }
    res.status(200).send(true)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

export default router