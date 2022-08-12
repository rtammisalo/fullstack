import React from 'react'
import Blog from '../components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeBlog as removeBlogAction,
  likeBlog as likeBlogAction,
} from '../reducers/blogReducer'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
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
          />
        ))}
    </div>
  )
}

export default Blogs
