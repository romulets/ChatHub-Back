import Mongoose, { Schema } from 'mongoose'

const repositorySchema = new Schema({
    name: String,
    url: String
})

export default Mongoose.model('Repository', repositorySchema)