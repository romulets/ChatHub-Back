import  { Router } from 'express'
import bodyParser from 'body-parser'
import login from './login'
import repositories from './repositories'
import threads from './threads'

const router = Router()
router.use(bodyParser.json())

router.use((req, _, next) => {
    console.log(`STARTING ${req.method} ${req.originalUrl}`)
    next()
})

router.use('/login', login)
router.use('/repositories', repositories)
router.use('/projects/:projectId/threads', threads)

export default router