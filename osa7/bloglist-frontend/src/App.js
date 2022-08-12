import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoginInfo from './components/LoginInfo'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useSelector } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const userNotification = useSelector((state) => state.notification)
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
      blogService.getAll().then((blogs) => setBlogs(blogs))
    } else {
      setBlogs([])
    }
  }, [user])

  const addBlog = (blog) => {
    const blogData = {
      title: blog.blogTitle,
      author: blog.blogAuthor,
      url: blog.blogUrl,
    }

    return blogService.create(user, blogData).then((createdBlog) => {
      createdBlog.user = {
        id: createdBlog.user,
        name: user.name,
        username: user.username,
      }
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      return createdBlog
    })
  }

  return (
    <div>
      <h1>blogs</h1>
      {userNotification && <Notification />}
      {!user && <LoginForm setUser={setUser} />}
      {user && (
        <div>
          <LoginInfo user={user} setUser={setUser} />
          <Togglable showLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <Blogs blogs={blogs} setBlogs={setBlogs} user={user} />
        </div>
      )}
    </div>
  )
}

export default App
