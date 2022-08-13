const blogsRouter = require('express').Router()
const BlogModel = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await BlogModel.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new BlogModel(request.body)
  const user = request.user

  blog.user = user.id
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await BlogModel.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(401).end()
  }

  await blog.delete()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = { ...request.body }
  const updatedBlog = await BlogModel.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true }
  ).populate('user', { username: 1, name: 1 })

  if (!updatedBlog) {
    return response.status(404).end()
  }

  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await BlogModel.findById(request.params.id)
  const comment = request.body.comment

  if (!blog) {
    return response.status(404).end()
  }

  blog.comments.push(comment)
  blog.save()

  response.status(201).end()
})

module.exports = blogsRouter
