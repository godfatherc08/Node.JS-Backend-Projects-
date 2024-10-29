const Comment = require('../models/comments')
const User = require('../models/user')
const Post = require('../models/post')

const createComment = async(req, res) => {
    const body = req.body
    const emailAddress = body.emailAddress
    const title = body.title
    const user = await User.findOne({ emailAddress })
    const post = await Post.findOne({ title })
    try{
       if(user){
        const newComment = new Comment({
            comment : body.comment,
            commentersID: user._id,
            postID : post._id
          })
          await newComment.save()
          res.send("Comment created succcessfully")
          console.log(newComment)
       }
       else{
        res.send()
       }
    }
    catch(err){
        console.log(err)
    }
}



module.exports = { createComment }