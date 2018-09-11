import { Router } from 'express'
import errorHandler from '../error-handler';
import { loginAndSync } from '../../domain/users';

const router = Router()

router.post('/', async (req, res) => {
  try {
    const resp = await loginAndSync(req.body.code)
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})


export default router