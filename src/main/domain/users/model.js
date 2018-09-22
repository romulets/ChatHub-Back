import Mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    username: String,
    githubId: Number,
    name: String,
    url: String,
    avatarUrl: String,
    repositories: Array,
})

export default Mongoose.model('User', userSchema)