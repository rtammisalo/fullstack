import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div id='blogs-list'>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} style={style}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  )
}

export default Blogs
