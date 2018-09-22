import Mongoose, { Schema } from 'mongoose'

const threadSchema = new Schema({
    name: String,
    description: String,
    repositoryId: String,
    createdAt: Date,
    main: Boolean
})

export default Mongoose.model('Thread', threadSchema)