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
    case 'JsonWebTokenError':
      return response.status(401).json('missing or invalid token')
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const middleware = { errorHandler, tokenExtractor }

module.exports = middleware