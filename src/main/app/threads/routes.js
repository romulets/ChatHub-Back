import { Router } from 'express'
import errorHandler from '../error-handler';
import { getThread, saveThread, getThreadsFromRepository, updateThread } from '../../domain/threads';

const router = Router()

router.get('/', async (req, res) => {
  try {
    const repositoryId = req.baseUrl.split('/')[2]
    console.info(repositoryId)
    const resp = await getThreadsFromRepository(repositoryId)
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

router.get('/:threadId', async (req, res) => {
  try {
    const resp = await getThread(req.params.threadId)
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

router.post('/:threadId', async (req, res) => {
  try {
    const resp = await updateThread(req.body)
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