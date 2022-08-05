import React, { useState } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)

  return (
    <div>
      {!user && <LoginForm setUser={setUser} />}
      {user && <Blogs user={user} />}
    </div>
  )
}

export default App
