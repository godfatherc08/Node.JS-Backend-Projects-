const express = require('express')
const router = express.Router()

const { admin, adminAdd, adminDelete, adminGet } = require('../controllers/admin')
const { addUser, loginUser, deleteUser} = require('../controllers/user')

const add = [admin, adminAdd, addUser]
const del = [admin, adminDelete, deleteUser]
const get = [admin, adminGet]

router.post('/add-admin', add)
router.get('/get-admin', get)
router.delete('/delete-admin', del)


module.exports = router