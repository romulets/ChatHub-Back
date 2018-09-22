import express from 'express'
import cors from 'cors'
import mainApp from './app'
import { config as envConfig } from 'dotenv'
import Mongoose from 'mongoose';

envConfig()

Mongoose.connect('mongodb://localhost:27017/chathub')

const expressApp = express()
expressApp.use(cors())
expressApp.use(mainApp)
expressApp.listen(3100, () => console.log('Listening rest :3100'))