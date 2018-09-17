import  { Router } from 'express'
import bodyParser from 'body-parser'
import login from './login'
import repositories from './repositories'
import threads from './threads'

const router = Router()
router.use(bodyParser.json())

router.use('/login', login)
router.use('/repositories', repositories)
router.use('/threads', threads)

export default router