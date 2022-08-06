import React from 'react'
import PropTypes from 'prop-types'
import Blog from '../components/Blog'
import blogService from '../services/blogs'

const Blogs = ({ user, blogs, setBlogs, showNotification }) => {
  const likeBlog = (blog) => {
    blogService
      .update(user, { ...blog, likes: blog.likes + 1 })
      .then(updatedBlog => {
        blog.likes = updatedBlog.likes
        setBlogs([...blogs])
        showNotification(`Liked blog ${blog.title} by ${blog.author}`)
      })
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(user, blog)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
          showNotification(`Removed blog ${blog.title} by ${blog.author}`)
        })
    }
  }

  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />
      )}
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.object,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func,
  showNotification: PropTypes.func
}

export default Blogs