import Mongoose, { Schema } from 'mongoose'

const MessageSchema = new Schema({
    content: String,
    threadId: String,
    sentAt: Date,
    savedAt: Date,
    user: {
        githubId: Number,
        username: String,
        name: String
    }
})

export default Mongoose.model('Message', MessageSchema)