import 'babel-polyfill'
import express from 'express'
import cors from 'cors'
import mainApp from './app/routes'
import { config as envConfig } from 'dotenv'
import Mongoose from 'mongoose';

envConfig()

const REST_PORT = process.env.PORT || 3100

if (process.env.NODE_ENV === 'production') {
    Mongoose.connect('mongodb://chathub:8lvVi1jYsrlmvC0R@cluster0-shard-00-00-ahbky.gcp.mongodb.net:27017,cluster0-shard-00-01-ahbky.gcp.mongodb.net:27017,cluster0-shard-00-02-ahbky.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
} else {
    Mongoose.connect('mongodb://localhost:27017/chathub')
}

const expressApp = express()
expressApp.use(cors())
expressApp.use(mainApp)
expressApp.listen(REST_PORT, () => console.info(`Listening rest :${REST_PORT}`))