import  { Router } from 'express'
import bodyParser from 'body-parser'
import loginRoutes from './login/routes'
import repositoriesRoutes from './repositories/routes'
import threadsRoutes from './threads/routes'
import messagesRoutes from './messages/routes'
import eventsRoutes from './events/routes'
import hooksRoutes from './hooks/routes'

const router = Router({mergeParams: true})
router.use(bodyParser.json())

router.use((req, _, next) => {
    console.info(`${req.method} ${req.originalUrl}`)
    next()
})

router.get('/', (_, res) => res.status(200).send({itWorks: 'It works!'}))

router.use('/login', loginRoutes)
router.use('/users/:userId/repositories', repositoriesRoutes)
router.use('/repositories/:repositoryId/threads', threadsRoutes)
router.use('/repositories/:repositoryId/threads/:threadId/messages', messagesRoutes)
router.use('/:userName/:repositoryName/events', eventsRoutes)
router.use('/hooks', hooksRoutes)

export default router