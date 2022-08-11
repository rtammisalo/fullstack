import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      showNotification(exception.response.data, true)
    }

    setUsername('')
    setPassword('')
  }

  return (
    <div>
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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
}

export default LoginForm
