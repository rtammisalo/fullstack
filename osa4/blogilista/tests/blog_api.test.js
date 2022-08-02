const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const BlogModel = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

// eslint-disable-next-line no-unused-vars
const blogsInDb = async () => {
  const blogs = await BlogModel.find({})
  return blogs.map(blog => blog.toJSON())
}

beforeEach(async () => {
  await BlogModel.deleteMany({})
  await BlogModel.insertMany(initialBlogs)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('returned blogs contain a blog in the database', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.map(blog => blog.title))
    .toContain('Type wars')
})

test('returned blogs have an id field', async () => {
  const blogs = await blogsInDb()
  expect(blogs[0].id).toBeDefined()
})

const unaddedBlog = {
  title: 'Are ghosts real?',
  author: 'Charles Mort',
  url: 'http://www.darkcatacomb.com/blog/are_ghosts_real.html',
  likes: 12
}

const addNewBlog = async (inputBlog) => {
  await api
    .post('/api/blogs')
    .send(inputBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await blogsInDb()

  return blogs
}

test('POST request gets added to the database', async () => {
  const blogs = await addNewBlog(unaddedBlog)
  expect(blogs.map(blog => blog.title)).toContain('Are ghosts real?')
})

test('POST request adds only one blog to the database', async () => {
  const blogs = await addNewBlog(unaddedBlog)
  expect(blogs).toHaveLength(initialBlogs.length + 1)
})

test('Adding a new blog with no likes-value defaults to zero likes', async () => {
  const blog = { ...unaddedBlog }
  delete blog.likes
  const blogs = await addNewBlog(blog)
  expect(blogs.find(blog => blog.title === 'Are ghosts real?').likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})