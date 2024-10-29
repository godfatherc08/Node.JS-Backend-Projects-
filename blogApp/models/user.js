
const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    emailAddress : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
    },
    creatorID: {
        type: Boolean, 
        default: true
    },
    userType: {
        type: String,
        enum : ['user', 'admin'],
        default: 'user'
    }
},
{timestamps: true}
)
// creatorId is true, so any user can make posts
// initially it was false, but i did not want the code to throw an error whem you try adding a post and you don't change the boolean value
// i am not sure aboout doing it any other way sir

const User = mongoose.model('user', user)
module.exports = User
