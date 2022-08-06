import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoginInfo from './components/LoginInfo'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [userNotification, setUserNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')

    if (userJSON) {
      setUser(JSON.parse(userJSON))
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs.filter(b => b.user.username === user.username)))
    } else {
      setBlogs([])
    }
  }, [user])

  const showNotification = (message, error) => {
    setUserNotification({ text: message, error })
    setTimeout(() => setUserNotification(null), 5000)
  }

  const addBlog = (blog) => {
    const blogData = {
      title: blog.blogTitle,
      author: blog.blogAuthor,
      url: blog.blogUrl
    }

    return (blogService
      .create(user, blogData)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        blogFormRef.current.toggleVisibility()
        return createdBlog
      }))
  }

  return (
    <div>
      <h1>blogs</h1>
      {userNotification && <Notification message={userNotification} />}
      {!user && <LoginForm setUser={setUser} showNotification={showNotification} />}
      {user &&
        <div>
          <LoginInfo user={user} setUser={setUser} />
          <Togglable showLabel='new note' hideLabel='cancel' ref={blogFormRef}>
            <BlogForm addBlog={addBlog} showNotification={showNotification} />
          </Togglable>
          <Blogs blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App
