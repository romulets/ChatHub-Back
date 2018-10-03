import { Router } from 'express'
import errorHandler from '../error-handler'
import { syncEvents } from '../../domain/events'

const router = Router({mergeParams: true})

router.get('/', async (req, res) => {
  try {
    const resp = await syncEvents(req.params.userName, req.params.repositoryName)
    res.status(200).send(resp)
  } catch (err) {
    errorHandler(err, res, 500)
  }
})


export default router