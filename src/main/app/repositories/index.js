import { Router } from 'express'
import errorHandler from '../error-handler';
import { getRepositories, saveRepository } from '../../domain/repositories';

const router = Router()

router.get('/', async (req, res) => {
  try {
    const resp = await getRepositories(req.query.token)
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})

router.post('/', async (req, res) => {
  try {
    const resp = await saveRepository(req.body)
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})


export default router