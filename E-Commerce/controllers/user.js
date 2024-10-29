const User = require('../models/user')
const secretKey = "sui1d23kf29g382fgojmsxb ;kwnd'pwdb"
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const addUser = async(req, res) => {
    const {firstName, lastName, emailAddress, password}= req.body
    const salt = 10
    const hashedPassword = await bcrypt.hashSync(password, salt)
    try{
    if(typeof firstName !== 'string'){
        return res.status(500).send("It is not a string")
    }
    else if(typeof lastName !== 'string'){
        return res.status(500).send("It is not a string")
    }
    else if(typeof emailAddress !== 'string'){
        return res.status(500).send("It is not a string")
    }
    else if(typeof password !== 'string'){
        
        return res.status(500).send("It is not a string")
    }
    else{
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        password: hashedPassword,
    })
    await newUser.save()
    res.send("User created successfully")
    console.log(newUser)}
}
    catch(err){
        res.status(404).send("Unexpected error")
        console.log(err)
    }

}


const checkUser = async(req, res, next) => {
    const { emailAddress, password } = req.body
    if(typeof emailAddress != 'string'){
        return res.status(500).send("It is not a string")
    }
    else if(typeof password != 'string'){
        return res.status(500).send("It is not a string")
    }
    else{
        const savedUser = await User.findOne({ emailAddress })
        
        if (savedUser){
            const check = bcrypt.compareSync(password, savedUser.password)
            if(check){
                req.user = savedUser
                console.log(savedUser)
                next()
            }
            else{
                return res.send("wrong password")
            }
        }
        else{
            return res.status(401).send("wrong credentials")
        }
    }
}


const loginUser = async(req, res) => {
    const savedUser = req.user

    try{
        const token = jwt.sign({emailAddress: savedUser.emailAddress, ID: savedUser._id}, secretKey, {expiresIn : '2h'}) 
        res.cookie('authenticationToken', token, { httpOnly: true, secure:false, samesite:'lax',maxAge:24*60*60*1000 })
        return res.status(200).send("Welcome " + savedUser.firstName)
    }

    catch(err){
        console.log(err)
    }
}

const changeRoles= async(req, res) => {
    const authenticationToken = req.cookies.authenticationToken
    const savedUser = req.user
    const { newRole } = req.body

    const decoded = jwt.verify(authenticationToken, secretKey)
    


    try{
        if(savedUser){
            if(decoded.ID == savedUser._id){
                savedUser.roles = newRole
                await savedUser.save()
                res.status(200).send("ROLES HAVE BEEN CHANGED")
                console.log(savedUser)
            }
            else{
                res.status(500).send("Roles cannot be changed, check your roles")
            }
    }
        else{
            res.status(404).send("User cannot be found")
        }
    }
    catch(err){
        console.log(err)
    }

}

const deleteUser = async(req,res) => {
    const {emailAddress, password} = req.body
    try{
        const savedUser = await User.findOne({ emailAddress })
        const check = bcrypt.compareSync(password, savedUser.password)
        if(savedUser && check){
            const UserId = savedUser._id
            await User.findByIdAndDelete(UserId)
            res.clearCookie('authenticationToken')
            return res.status(200).send('Account Deleted :)')
        }
        else{
            res.send('Wrong credentials')
        }
    }
    catch(err){
        res.status(404).send(err)
    }
}



module.exports = { addUser, checkUser, loginUser, changeRoles, deleteUser}
