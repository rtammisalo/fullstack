const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const BlogModel = require('../models/blog')
const helpers = require('./test_helpers')

const api = supertest(app)

const addNewBlog = async (inputBlog) => {
  await api
    .post('/api/blogs')
    .send(inputBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helpers.blogsInDb()

  return blogs
}

describe('when there are blogs in the database', () => {
  beforeEach(async () => {
    await BlogModel.deleteMany({})
    await BlogModel.insertMany(helpers.initialBlogs)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helpers.initialBlogs.length)
  })

  test('returned blogs contain a blog in the database', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.map(blog => blog.title))
      .toContain('Type wars')
  })

  test('returned blogs have an id field', async () => {
    const blogs = await helpers.blogsInDb()

    expect(blogs[0].id).toBeDefined()
  })

  describe('adding a new blog', () => {
    test('POST request gets added to the database', async () => {
      const blogs = await addNewBlog(helpers.unaddedBlog)

      expect(blogs.map(blog => blog.title)).toContain('Are ghosts real?')
    })

    test('POST request adds only one blog to the database', async () => {
      const blogs = await addNewBlog(helpers.unaddedBlog)

      expect(blogs).toHaveLength(helpers.initialBlogs.length + 1)
    })

    test('adding malformatted blog receives response with code 400', async () => {
      await api
        .post('/api/blogs')
        .send(helpers.malformattedBlog)
        .expect(400)
    })

    test('Adding a new blog with no likes-value defaults to zero likes', async () => {
      const blog = { ...helpers.unaddedBlog }
      delete blog.likes
      const blogs = await addNewBlog(blog)

      expect(blogs.find(blog => blog.title === 'Are ghosts real?').likes).toBe(0)
    })
  })

  describe('removing a blog', () => {
    test('removes it from the database', async () => {
      const selectedBlog = await BlogModel.findOne({ title: 'React patterns' })

      await api
        .delete(`/api/blogs/${selectedBlog.id}`)
        .expect(204)
      const blogs = await helpers.blogsInDb()

      expect(blogs.map(blog => blog.title)).not.toContain('React patterns')
    })

    test('with a malformatted id returns code 400', async () => {
      await api
        .delete('/api/blogs/1')
        .expect(400)
    })

    test('with a nonexistant id returns code 404', async () => {
      const unusedId = await helpers.nonExistingId()
      await api
        .delete(`/api/blogs/${unusedId}`)
        .expect(404)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})