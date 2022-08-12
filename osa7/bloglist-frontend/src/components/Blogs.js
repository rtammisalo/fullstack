import React from 'react'
import PropTypes from 'prop-types'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const likeBlog = (blog) => {
    blogService
      .update(user, { ...blog, likes: blog.likes + 1 })
      .then((updatedBlog) => {
        blog.likes = updatedBlog.likes
        // setBlogs([...blogs])
        dispatch(setNotification(`Liked blog ${blog.title} by ${blog.author}`))
      })
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(user, blog).then(() => {
        // setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(
          setNotification(`Removed blog ${blog.title} by ${blog.author}`)
        )
      })
    }
  }

  return (
    <div id='blogs-list'>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Blogs
