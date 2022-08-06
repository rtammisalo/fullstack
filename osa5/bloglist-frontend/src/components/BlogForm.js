import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, showNotification }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()

    addBlog({ blogTitle, blogAuthor, blogUrl })
      .then(createdBlog => {
        showNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
        setBlogAuthor('')
        setBlogTitle('')
        setBlogUrl('')
      })
      .catch(error => {
        showNotification(error.response.data, true)
      })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
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
  addBlog: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired
}

export default BlogForm