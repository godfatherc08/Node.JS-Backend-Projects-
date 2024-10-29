const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routerUser = require('./routes/user')
const routerTask = require('./routes/task')

const app = express()

const mongo_url= "mongodb://127.0.0.1:27017/Tasks"

mongoose
.connect(mongo_url)
.then(() => {
    console.log('Database worked')
})

app.use(express.json())
app.use(cookieParser())
app.use(routerUser)
app.use(routerTask)


const port = 5000
app.listen(port, () => {
    console.log("Task app is running")
})