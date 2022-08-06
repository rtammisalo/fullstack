import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Blog from '../components/Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Blogs = ({ user, setUser, showNotification }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.filter(b => b.user.username === user.username))
    )
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </p>
      <BlogForm user={user} showNewBlog={(blog) => setBlogs(blogs.concat(blog))}
        showNotification={showNotification} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  showNotification: PropTypes.func
}

export default Blogs