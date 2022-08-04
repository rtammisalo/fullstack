const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)

module.exports = app