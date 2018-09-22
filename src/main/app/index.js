import  { Router } from 'express'
import bodyParser from 'body-parser'
import login from './login'
import repositories from './repositories'
import threads from './threads'

const router = Router({mergeParams: true})
router.use(bodyParser.json())

router.use((req, _, next) => {
    console.log(`STARTING ${req.method} ${req.originalUrl}`)
    next()
})

router.use('/login', login)
router.use('/users/:userId/repositories', repositories)
router.use('/projects/:repositoryId/threads', threads)

export default router