import React from 'react'
import PropTypes from 'prop-types'
import Blog from '../components/Blog'

const Blogs = ({ user, blogs }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

Blogs.propTypes = {
  user: PropTypes.object,
  blogs: PropTypes.array
}

export default Blogs