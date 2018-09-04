import { Router } from 'express'
import errorHandler from '../error-handler';
import { login } from '../../infra/github';

const router = Router()

router.post('/', async (req, res) => {
  try {
    const resp = await login(req.body.code)
    res.status(resp.error ? 401 : 200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})


export default router