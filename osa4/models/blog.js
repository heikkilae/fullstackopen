const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// Decralaration for the model. 1st parameter is name for the collection objects.
module.exports = mongoose.model('Blog', blogSchema)