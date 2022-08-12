import React, { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoginInfo from './components/LoginInfo'
import { useDispatch, useSelector } from 'react-redux'
import { restoreLoggedUser } from './reducers/userReducer'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import BlogView from './components/BlogView'
import Users from './components/Users'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [storedUser, setStoredUser] = useState(null)

  useEffect(() => {
    dispatch(restoreLoggedUser())
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
          path='/'
          element={storedUser ? <BlogView /> : navigateToLogin()}
        />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </div>
  )
}

export default App
