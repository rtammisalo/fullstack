import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Blog from '../components/Blog'
import blogService from '../services/blogs'

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.filter(b => b.user.username === user.username))
    )
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.object
}

export default Blogs