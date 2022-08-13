import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  removeBlog as removeBlogAction,
  likeBlog as likeBlogAction,
} from '../reducers/blogReducer'
import Comments from './Comments'

const Blog = () => {
  const blogId = useParams().id
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const [blog, setBlog] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!blogs.uninitialized) {
      let foundBlog = blogs.find((b) => b.id === blogId)

      if (!foundBlog) {
        navigate('/')
      }

      setBlog(foundBlog)
    }
  }, [blogs, navigate, blogId])

  const likeBlog = () => {
    dispatch(likeBlogAction(user, blog))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlogAction(user, blog))
      navigate('/')
    }
  }

  if (!user || !blog) {
    return null
  }

  return (
    <div className='blog'>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes <button onClick={() => likeBlog(blog)}>like</button>
      <br />
      added by {blog.user.name}
      <br />
      {user.username === blog.user.username && (
        <button
          onClick={() => removeBlog(blog)}
          style={{ backgroundColor: 'lightblue' }}
        >
          remove
        </button>
      )}
      <br />
      <Comments blog={blog} />
    </div>
  )
}

export default Blog
