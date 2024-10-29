
const mongoose = require('mongoose')

const comment = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    commentersID: {
        type: String
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
},
{timestamps: true}
)

const Comment = mongoose.model('comment', comment)
module.exports = Comment