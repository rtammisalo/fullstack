import React from 'react'
import PropTypes from 'prop-types'
import Blog from '../components/Blog'
import blogService from '../services/blogs'

const Blogs = ({ user, blogs, setBlogs }) => {
  const likeBlog = (blog) => {
    blogService
      .update(user, { ...blog, likes: blog.likes + 1 })
      .then(updatedBlog => {
        blog.likes = updatedBlog.likes
        setBlogs([...blogs])
      })
  }
  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} likeBlog={likeBlog} />
      )}
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.object,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func
}

export default Blogs