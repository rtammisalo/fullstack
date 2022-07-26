import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
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
    <div style={blogStyle} className='blog' >
      {blog.title} {blog.author}
      <button onClick={showAll}>{viewButtonLabel}</button><br />
      {viewButtonLabel === 'hide' && (
        <div>
          {blog.url}<br />
          likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button><br />
          {blog.user.name}<br />
          {user.username === blog.user.username &&
            <button
              onClick={() => removeBlog(blog)}
              style={{ backgroundColor: 'lightblue' }}> remove
            </button>
          }
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog