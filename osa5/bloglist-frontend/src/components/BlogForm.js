import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleCreateBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const clear = () => {
    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog({ blogTitle, blogAuthor, blogUrl, clear })}>
        <div>
          Title:
          <input type='text' name='title' value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)} />
        </div>
        <div>
          Author:
          <input type='text' name='author' value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)} />
        </div>
        <div>
          Url:
          <input type='text' name='url' value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func
}

export default BlogForm