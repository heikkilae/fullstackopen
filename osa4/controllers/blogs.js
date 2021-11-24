const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
  // Async/await requires try-catch exception handling.
  // can be also handled with https://github.com/davidbanham/express-async-errors
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }  catch (exception) {
    console.log("=DEBUG=")
    next(exception)
  }
})

module.exports = blogsRouter