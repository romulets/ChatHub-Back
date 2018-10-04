import Mongoose, { Schema } from 'mongoose'

const MessageSchema = new Schema({
    content: String,
    threadId: String,
    sentAt: Date,
    savedAt: Date,
    eventId: Number,
    user: {
        githubId: Number,
        username: String,
        name: String
    },
    url: String
})

export default Mongoose.model('Message', MessageSchema)