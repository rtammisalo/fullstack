import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser(username, password))

    setUsername('')
    setPassword('')
  }

  return (
    <div style={user ? { display: 'none' } : {}}>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type='text'
            value={username}
            name='Username'
            id='login-username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type='password'
            value={password}
            name='Password'
            id='login-password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' id='login-button'>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
