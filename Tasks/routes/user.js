const express = require('express')
const router = express.Router()

const { addUser, checkUser, loginUser, deleteUser} = require('../controllers/user')

const login = [checkUser, loginUser]


router.post('/add-user', addUser)
router.get ('/login-user', login)
router.delete('/delete-User', deleteUser)

module.exports = router