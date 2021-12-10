const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Decralaration for the model. 1st parameter is name for the collection objects.
module.exports = mongoose.model('Blog', blogSchema)