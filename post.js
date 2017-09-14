const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {type: String, required:true, unique:true},
  description: {type: String, required:true}
})

const Post = mongoose.model('Post',postSchema)

module.exports = Post
