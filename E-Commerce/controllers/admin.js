const User = require('../models/user')
const secretKey = "sui1d23kf29g382fgojmsxb ;kwnd'pwdb"
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const admin = async(req, res, next) =>{

    const {adminAddress, password} = req.body
    

    const admin = User.findOne({ adminAddress })

    if(admin.roles = 'admin'){
        
            const token = jwt.sign({emailAddress: adminAddress, ID: admin._id}, secretKey, {expiresIn : '2h'}) 
            res.cookie('adminToken', token, { httpOnly: true, secure:false, samesite:'lax',maxAge:24*60*60*1000 })
        
        console.log("An admin has logged in")
        next()
    }
    else{
        return res.status(401).send("wrong credentials")
    }
}

const adminAdd = async(req, res, next) =>{
    next()
}
const adminDelete = async(req, res, next) => {
    next()
}
const adminGet = async(req, res, next) => {
    const body = req.body
    const emailAddress = body.emailAddress
    try{
        const user = await User.findOne({ emailAddress })
        if(user){   
            res.json(user)
}
        else{
            res.send("This user does not exist, admin")
   }
}
   catch(err){
        console.log(err)
   }
}


module.exports = { admin, adminAdd, adminDelete, adminGet }