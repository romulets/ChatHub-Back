import { Router } from 'express'
import errorHandler from '../error-handler';
import { loadMessagesByThread, loadNextMessagesByThread, createMessage } from '../../domain/messages';

const router = Router({mergeParams: true})

router.post('/', async (req, res) => {
  try {
    const {content, user, sentAt} = req.body
    const resp = await createMessage(content, req.params.threadId, user, sentAt)
  
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || 20)
    const skip = parseInt(req.query.skip || 0)
    const { search } = req.query
    const resp = await loadMessagesByThread(req.params.threadId, {limit, skip, search})
  
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

router.get('/next/:timestamp', async (req, res) => {
  try {
    const timestamp = new Date(parseInt(req.params.timestamp))
    const resp = await loadNextMessagesByThread(req.params.threadId, timestamp)
  
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

export default router