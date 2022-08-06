import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [userNotification, setUserNotification] = useState(null)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      setUser(JSON.parse(userJSON))
    }
  }, [])

  const showNotification = (message, error) => {
    setUserNotification({ text:message, error })
    setTimeout(() => setUserNotification(null), 5000)
  }

  return (
    <div>
      {userNotification && <Notification message={userNotification} />}
      {!user && <LoginForm setUser={setUser} showNotification={showNotification} />}
      {user && <Blogs user={user} setUser={setUser} showNotification={showNotification} />}
    </div>
  )
}

export default App
