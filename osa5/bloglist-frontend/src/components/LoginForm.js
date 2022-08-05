import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
    } catch (exception) {
      console.log('handleLogin error')
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
          <input type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input type='password' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func
}

export default LoginForm