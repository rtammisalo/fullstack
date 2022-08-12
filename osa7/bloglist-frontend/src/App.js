import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoginInfo from './components/LoginInfo'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { restoreLoggedUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const userNotification = useSelector((state) => state.notification)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(restoreLoggedUser())
  }, [dispatch])

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h1>blogs</h1>
      {userNotification && <Notification />}
      {!user && <LoginForm />}
      {user && (
        <div>
          <LoginInfo />
          <Togglable showLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
            <BlogForm toggleVisibility={toggleVisibility} />
          </Togglable>
          <Blogs />
        </div>
      )}
    </div>
  )
}

export default App
