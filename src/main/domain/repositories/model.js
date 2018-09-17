import Mongoose, { Schema } from 'mongoose'

const repositorySchema = new Schema({
    githubId: Number,
    name: String,
    fullName: String,
    description: String,
    url: String
})

export default Mongoose.model('Repository', repositorySchema)