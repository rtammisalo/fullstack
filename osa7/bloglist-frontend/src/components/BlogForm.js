import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ user, toggleVisibility }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const dispatch = useDispatch()

  const closeForm = () => {
    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
    toggleVisibility()
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()

    dispatch(createBlog(user, { blogTitle, blogAuthor, blogUrl }, closeForm))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input
            type='text'
            name='title'
            value={blogTitle}
            id='blogform-title'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            name='author'
            value={blogAuthor}
            id='blogform-author'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type='text'
            name='url'
            value={blogUrl}
            id='blogform-url'
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type='submit' id='blogform-button'>
          create
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  user: PropTypes.object,
  toggleVisibility: PropTypes.func.isRequired,
}

export default BlogForm
