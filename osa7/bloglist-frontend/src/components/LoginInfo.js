import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { clearBlogs } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'

const LoginInfo = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    loginService.removeStoredUser()
    dispatch(removeUser())
    dispatch(clearBlogs())
    navigate('/')
  }

  if (!user) {
    return null
  }

  return (
    <div>
      {user.name} logged in
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default LoginInfo
