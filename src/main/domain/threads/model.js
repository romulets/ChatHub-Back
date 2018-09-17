import Mongoose, { Schema } from 'mongoose'

const threadSchema = new Schema({
    name: String,
    description: String,
    projectId: Number
})

export default Mongoose.model('Thread', threadSchema)