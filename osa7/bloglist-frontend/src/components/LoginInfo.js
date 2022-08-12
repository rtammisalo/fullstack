import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const LoginInfo = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      {user.name} logged in
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default LoginInfo
