import React from 'react'
import PropTypes from 'prop-types'
import Blog from '../components/Blog'

const Blogs = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array
}

export default Blogs