import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogForm = ({ user, showNewBlog, showNotification }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()

    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    blogService
      .create(user, blog)
      .then((createdBlog) => {
        showNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        showNewBlog(createdBlog)
      })
      .catch(error => {
        showNotification(error.response.data, true)
      })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
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
  user: PropTypes.object,
  showNewBlog: PropTypes.func,
  showNotification: PropTypes.func
}

export default BlogForm