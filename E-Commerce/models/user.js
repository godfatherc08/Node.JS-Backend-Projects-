const mongoose = require('mongoose')

const user = new mongoose.Schema({
    firstName: {
        required: true,
        type: String,

    },
    lastName: {
        required: true,
        type:String
    },
    emailAddress:{
        required: true,
        type: String,
        unique: true
    },
    password:{
        required: true,
        type: String
    },
    roles:{
        type: String,
        enum:['user', 'admin'],
        default: 'user'
    }
},
{timestamps: true}
)


const User = mongoose.model("User", user)
module.exports = User