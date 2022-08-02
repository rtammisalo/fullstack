require('./config')

const errorHandler = (error, request, response, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(error.message)
  }

  switch (error.name) {
    case 'CastError':
      return response.status(400).send(error.message)
    case 'ValidationError':
      return response.status(400).json(error.message)
  }

  next(error)
}

const middleware = { errorHandler }

module.exports = middleware