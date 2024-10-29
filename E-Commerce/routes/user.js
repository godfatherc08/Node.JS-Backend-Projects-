const express = require('express')
const router = express.Router()

const { addUser, checkUser, loginUser, deleteUser, changeRoles} = require('../controllers/user')

const login = [checkUser, loginUser]
const change = [checkUser, changeRoles]
const deleteU = [checkUser, deleteUser]

router.post('/add-user', addUser)
router.get ('/login-user', login)
router.put('/update-roles', change )
router.delete('/delete-user', deleteU)

module.exports = router