import { Router } from 'express'
import errorHandler from '../error-handler';
import { getRepositories, saveRepository } from '../../domain/repositories';

const router = Router({mergeParams: true})

router.get('/', async (req, res) => {
  try {
    const resp = await getRepositories(req.params.userId)
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

export default router