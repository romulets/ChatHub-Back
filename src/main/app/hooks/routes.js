import { Router } from 'express'
import errorHandler from '../error-handler';
import { loadMessagesByThread, loadNextMessagesByThread, createMessage } from '../../domain/messages';
import { getThreadsFromRepository } from '../../domain/threads';
import { findByGithubId } from '../../domain/repositories';

const router = Router({mergeParams: true})

router.post('/', async (req, res) => {
  try {
    //console.log(req.body)
    if(req.body.commits != null){
        const repository = await findByGithubId(req.body.repository.id)
        const threads = await getThreadsFromRepository(repository.id)
        const mainThread = threads.filter((t) => t.name === "Main")[0]
        //console.log(threads)
        //console.log(mainThread)

        const commits = req.body.commits;
        //console.log(commits)
        for(let i in commits){
            const commit = commits[i]
            const userName = commit.author.username;
            const content = `Um commit foi adicionado no repositório por ${userName}`
            const resp = await createMessage(content, mainThread._id, null, new Date())
            if(!resp){
                res.status(200).send(resp)
            }
        }
    }
    res.status(200).send(true)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

export default router