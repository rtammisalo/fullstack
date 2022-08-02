const blogsRouter = require('express').Router()
const BlogModel = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  BlogModel
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new BlogModel(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter