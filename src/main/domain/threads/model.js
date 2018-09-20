import Mongoose, { Schema } from 'mongoose'

const threadSchema = new Schema({
    name: String,
    description: String,
    projectId: String,
    createdAt: Date
})

export default Mongoose.model('Thread', threadSchema)