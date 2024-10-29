
const mongoose = require('mongoose')
const schema = mongoose.schema
const post = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
)

const Post = mongoose.model("Post", post)
module.exports = Post
