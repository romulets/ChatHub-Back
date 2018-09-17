import { Router } from 'express'
import errorHandler from '../error-handler';
import { getThreads, saveThread } from '../../domain/threads';

const router = Router()

router.get('/:projectId', async (req, res) => {
  try {
    console.log(req.params.projectId)
    const resp = await getThreads(req.params.projectId)
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