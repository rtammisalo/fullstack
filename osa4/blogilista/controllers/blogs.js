const blogsRouter = require('express').Router()
const BlogModel = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await BlogModel.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new BlogModel(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const removedBlog = await BlogModel.findByIdAndRemove(request.params.id)
  if (!removedBlog) {
    return response.status(404).end()
  }
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = { ...request.body }
  const updatedBlog = await BlogModel
    .findByIdAndUpdate(request.params.id, blog, { new: true })

  if (!updatedBlog) {
    return response.status(404).end()
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter