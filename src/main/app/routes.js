import  { Router } from 'express'
import bodyParser from 'body-parser'
import loginRoutes from './login/routes'
import repositoriesRoutes from './repositories/routes'
import threadsRoutes from './threads/routes'

const router = Router({mergeParams: true})
router.use(bodyParser.json())

router.use((req, _, next) => {
    console.log(`STARTING ${req.method} ${req.originalUrl}`)
    next()
})

router.get('/', (_, res) => res.status(200).send({itWorks: 'It works!'}))

router.use('/login', loginRoutes)
router.use('/users/:userId/repositories', repositoriesRoutes)
router.use('/projects/:repositoryId/threads', threadsRoutes)

export default router