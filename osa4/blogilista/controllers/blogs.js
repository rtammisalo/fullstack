const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const BlogModel = require('../models/blog')
const UserModel = require('../models/user')

const verifyToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    throw { name: 'JsonWebTokenError' }
  }

  return decodedToken
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await BlogModel
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new BlogModel(request.body)
  const decodedToken = verifyToken(request.token)

  const user = await UserModel.findById(decodedToken.id)

  blog.user = user.id
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = verifyToken(request.token)
  const blog = await BlogModel.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (blog && blog.user.toString() !== decodedToken.id) {
    return response.status(401).end()
  }

  await blog.delete()

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