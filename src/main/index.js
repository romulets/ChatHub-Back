import express from 'express'
import cors from 'cors'
import mainApp from './app/routes'
import { config as envConfig } from 'dotenv'
import Mongoose from 'mongoose';
import http from 'http'
import { attachSocketToApp } from './app/messages/socket';


envConfig()

Mongoose.connect('mongodb://localhost:27017/chathub')

const expressApp = express()
expressApp.use(cors())
expressApp.use(mainApp)
expressApp.listen(3100, () => console.log('Listening rest :3100'))

const socketApp = http.Server()
attachSocketToApp(socketApp)
socketApp.listen(3200, () => console.log('Listening socket :3200'))