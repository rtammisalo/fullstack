import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={showAll}>{viewButtonLabel}</button><br />
      {viewButtonLabel === 'hide' && (
        <div>
          {blog.url}<br />
          likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button><br />
          {blog.user.name}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  likeBlog: PropTypes.func
}

export default Blog