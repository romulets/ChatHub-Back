import  { Router } from 'express'
import bodyParser from 'body-parser'
import login from './login'
import repositories from './repositories'

const router = Router()
router.use(bodyParser.json())

router.use((req, _, next) => {
    console.log(`STARTING ${req.method} ${req.originalUrl}`)
    next()
})

router.use('/login', login)
router.use('/repositories', repositories)

export default router