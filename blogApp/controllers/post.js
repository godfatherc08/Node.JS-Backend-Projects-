
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comments')

const addPost = async(req, res) => {
    const body = req.body
    const userID = body.userID
    const user = await User.findById(userID)
    if( user && user.creatorID){
        const newPost = new Post({
            title: body.title,
            content: body.content,
            creator: user._id
            // remember to add an id using userId: the id
        })
    try{
    const savedPost = await newPost.save()
    res.send("Post successful")
    console.log(savedPost)
    }
    catch(error){
        console.log(error)
    }
}}

const getPost = async(req, res) => {
    const posts = await Post.find({})
    res.json(posts)
}

const getOnePost = async(req, res) => {
    const body = req.body
    const title = body.title
    const post = await Post.findOne({ title })
    if( title ){
        res.send(post.content)
    }
    else{
        res.send("Post not found")
    }
}

const getOnePostComment = async(req,res) => {
    const body = req.body
    const title = body.title
    const post = await Post.findOne({ title })
    const postID = post._id
    const comment = await Comment.find({ postID })
    if( comment ){
        res.send(comment)
    }
    else{
        res.send("Post not found")
    }
}

const getAllComments = async(req, res) => {
    const comments = await Comment.find({})
    res.send(comments)
}



module.exports = { addPost, getOnePost, getPost, getOnePostComment, getAllComments }
