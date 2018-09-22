import { Router } from 'express'
import errorHandler from '../error-handler';
import { getThreads, saveThread, getThreadsFromRepository } from '../../domain/threads';

const router = Router()

router.get('/', async (req, res) => {
  try {
    const repositoryId = req.baseUrl.split('/')[2]
    console.log(repositoryId)
    const resp = await getThreadsFromRepository(repositoryId)
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

router.get('/:threadId', async (req, res) => {
  try {
    console.log(req.params.repositoryId)
    const resp = await getThreads(req.params.threadId)
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

router.post('/', async (req, res) => {
  try {
    const resp = await saveThread(req.body)
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

export default router