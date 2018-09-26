import { Router } from 'express'
import errorHandler from '../error-handler';
import { loadMessagesByThread } from '../../domain/messages';

const router = Router({mergeParams: true})

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || 20)
    const skip = parseInt(req.query.skip || 0)
    const resp = await loadMessagesByThread(req.params.threadId, limit, skip)
  
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

export default router