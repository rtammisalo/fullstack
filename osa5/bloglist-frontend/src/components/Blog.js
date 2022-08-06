import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ user, blog }) => {
  const [viewedBlog, setViewedBlog] = useState(blog)
  const [viewButtonLabel, setViewButtonLabel] = useState('view')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showAll = () => {
    viewButtonLabel === 'view' ?
      setViewButtonLabel('hide') :
      setViewButtonLabel('view')
  }

  const likeBlog = () => {
    blog.likes += 1
    blogService
      .update(user, blog)
      .then(updatedBlog => {
        blog.likes = updatedBlog.likes
        setViewedBlog(updatedBlog)
      })
  }

  return (
    <div style={blogStyle}>
      {viewedBlog.title} {viewedBlog.author}
      <button onClick={showAll}>{viewButtonLabel}</button><br />
      {viewButtonLabel === 'hide' && (
        <div>
          {viewedBlog.url}<br />
          likes {viewedBlog.likes} <button onClick={likeBlog}>like</button><br />
          {viewedBlog.user.name}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object,
  blog: PropTypes.object
}

export default Blog