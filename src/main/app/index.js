import  { Router } from 'express'
import bodyParser from 'body-parser'
import login from './login'
import repositories from './repositories'

const router = Router()
router.use(bodyParser.json())

router.use('/login', login)
router.use('/repositories', repositories)

export default router