import React from 'react'
import PropTypes from 'prop-types'
import Blog from '../components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeBlog as removeBlogAction,
  likeBlog as likeBlogAction,
} from '../reducers/blogReducer'

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const likeBlog = (blog) => {
    dispatch(likeBlogAction(user, blog))
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlogAction(user, blog))
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
