const bcrypt = require('bcrypt')
const UserModel = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body
  const passwordHash = await bcrypt.hash(password, 10)

  const user = new UserModel({
    username,
    passwordHash,
    name
  })
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await UserModel.find({})

  response.json(users)
})

module.exports = usersRouter