import React, { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoginInfo from './components/LoginInfo'
import { useDispatch, useSelector } from 'react-redux'
import { restoreLoggedUser } from './reducers/userReducer'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'
import loginService from './services/login'
import { getAllUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  // Have to use this, or reloads always redirect to root.
  const [storedUser, setStoredUser] = useState(loginService.getStoredUser())

  useEffect(() => {
    dispatch(restoreLoggedUser())
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    setStoredUser(loginService.getStoredUser())
  }, [user])

  const navigateToLogin = () => <Navigate replace to='/login' />

  return (
    <div>
      <h1>blogs</h1>
      <Link to='/users'>users</Link>
      <Notification />
      <LoginInfo />
      <Routes>
        <Route
          path='/login'
          element={!storedUser ? <LoginForm /> : <Navigate replace to='/' />}
        />
        <Route
          path='/users'
          element={storedUser ? <Users /> : navigateToLogin()}
        />
        <Route
          path='/users/:id'
          element={storedUser ? <User /> : navigateToLogin()}
        />
        <Route
          path='/'
          element={storedUser ? <BlogView /> : navigateToLogin()}
        />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </div>
  )
}

export default App
