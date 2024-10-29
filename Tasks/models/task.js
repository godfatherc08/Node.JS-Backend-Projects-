const mongoose = require('mongoose')

const task = new mongoose.Schema({
    task : {
        required: true,
        type: String
    },
    creatorID:{
        required: true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    category:{
        required: true,
        type: String,
        enum:['work', 'church', 'school', 'home', 'other'],
        default: 'other'
    },
    completed: {
        type: Boolean,
        enum:[true, false],
        default: false
    },
    deadline: {
        type: Date,
        required: true,
    }
},
{timestamps: true}
)


const Task = mongoose.model("Task", task)
module.exports = Task