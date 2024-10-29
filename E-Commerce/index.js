
const express = require('express')
const mongoose = require('mongoose')
const routerUser = require('./routes/user')
const routerProduct = require('./routes/product')
const routerAdmin = require('./routes/admin')
const cookieParser = require('cookie-parser')

const app = express()

const mongo_url= "mongodb://127.0.0.1:27017/E-Commerce"

mongoose
.connect(mongo_url)
.then(() => {
    console.log('Database worked')
})

app.use(express.json())
app.use(cookieParser())
app.use(routerUser)
app.use(routerProduct)
app.use(routerAdmin)


const port = 5000
app.listen(port, () => {
    console.log("E-Commerce app is running")
})