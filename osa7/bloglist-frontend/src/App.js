import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoginInfo from './components/LoginInfo'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { clearBlogs, getBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const userNotification = useSelector((state) => state.notification)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')

    if (userJSON) {
      setUser(JSON.parse(userJSON))
    }
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(getBlogs())
    } else {
      dispatch(clearBlogs())
    }
  }, [user, dispatch])

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
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
            <BlogForm toggleVisibility={toggleVisibility} user={user} />
          </Togglable>
          <Blogs user={user} />
        </div>
      )}
    </div>
  )
}

export default App
