
const express = require('express')
const router = express.Router()
const { addPost, getPost, getOnePost, getOnePostComment, getAllComments } = require('../controllers/post')

router.post('/add-post', addPost)
router.get('/get-post', getPost)
router.get('/get-one-post', getOnePost)
router.get('/get-one-post-comment', getOnePostComment)
router.get('/get-all-comments', getAllComments)

module.exports = router