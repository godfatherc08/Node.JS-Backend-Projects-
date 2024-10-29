
const User = require('../models/user')
const bcrypt = require('bcrypt')
const secretKey = "sui1d23kf29g382fgojb"
const jwt = require('jsonwebtoken')

const addUser = async(req, res) => {
    const { username, emailAddress, password} = req.body
    const saltRounds = 10
    // const salt = bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hashSync(password, saltRounds)
    try{
    const newUser = new User({
        username : username,
        emailAddress: emailAddress,
        password: hashedPassword
      })
      await newUser.save()
      res.send("User created succcessfully")
      console.log(newUser)
    }
    catch(err){
        console.log(err)
    }
}

const getUser = async (req, res) => {
    const { emailAddress, password } = req.body
    try{
    const savedUser = await User.findOne({ emailAddress })
    const check = bcrypt.compareSync(password, savedUser.password)
    if(!savedUser){
        res.send("User cannot be found")
    }
    if(check){
        const token = jwt.sign({username: savedUser.username}, secretKey, {expiresIn : '1h'}) 
        res.cookie('token', token)

        res.send("Welcome " + savedUser.username)
        console.log(savedUser)
    }
    
    else{
        res.send("Invalid credentials")
    }
    }
    catch(err){
        console.log(err)
    }
}
const logoutUser = async(req, res) =>{
    const {emailAddress, password} = req.body
    try{
    const savedUser = await User.findOne({ emailAddress })
    const check = bcrypt.compareSync(password, savedUser.password)

        res.clearCookie('token')
        res.status(200).send('Logged out')
    }
    catch(err){
        return res.status(404).send('error logging out')
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
            res.clearCookie('token')
            res.status(200).send('Account Deleted')
        }
        else{
            res.send('Wrong credentials')
        }
    }
    catch(err){
        res.status(404).send(err)
    }
}

const changeRoles = async(req, res) => {
    const { emailAddress, password, newRole } = req.body
    const savedUser = await User.findOne({ emailAddress })
    const check = bcrypt.compareSync(password, savedUser.password)

    try{
        if(savedUser){
                savedUser.userType = newRole
                await savedUser.save()
                res.status(200).send("ROLES HAVE BEEN CHANGED")
                console.log(savedUser)
            }
            else{
                res.status(500).send("Roles cannot be changed, check your roles")
            }
    
    }
    catch(err){
        console.log(err)
    }
}


module.exports = { addUser, getUser, logoutUser, deleteUser, changeRoles }