import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      setUser(JSON.parse(userJSON))
    }
  }, [])

  return (
    <div>
      {!user && <LoginForm setUser={setUser} />}
      {user && <Blogs user={user} setUser={setUser} />}
    </div>
  )
}

export default App
