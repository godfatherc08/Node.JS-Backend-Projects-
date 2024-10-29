
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routerUser = require('./routes/user')
const routerPost = require('./routes/post')
const routerComment = require('./routes/comments')

const app = express()

const mongo_url= "mongodb://127.0.0.1:27017/axia_exams_2"

mongoose
.connect(mongo_url)
.then(() => {
    console.log('Database worked')
})
app.use(express.json())
app.use(routerUser)
app.use(routerPost)
app.use(routerComment)
app.use(cookieParser)
const port = 5000

app.listen(port, () => {
    console.log("App is running")
})

