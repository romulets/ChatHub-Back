import express from 'express'
import cors from 'cors'
import mainApp from './app/routes'
import { config as envConfig } from 'dotenv'
import Mongoose from 'mongoose';
import http from 'http'
import { attachSocketToApp } from './app/messages/socket';

envConfig()

const REST_PORT = process.env.PORT || 3100

//Mongoose.connect('mongodb://localhost:27017/chathub')

const expressApp = express()
expressApp.use(cors())
expressApp.use(mainApp)
expressApp.listen(REST_PORT, () => console.log(`Listening rest :${REST_PORT}`))

export default expressApp

// const socketApp = http.Server()
// attachSocketToApp(socketApp)
// socketApp.listen(3200, () => console.log('Listening socket :3200'))