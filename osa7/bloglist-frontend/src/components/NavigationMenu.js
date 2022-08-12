import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginInfo from './LoginInfo'

const NavigationMenu = () => {
  const user = useSelector((state) => state.user)
  const style = {
    backgroundColor: 'lightgray',
    margin: 5,
    padding: 5,
  }
  const padding = {
    padding: 5,
  }

  if (!user) {
    return null
  }

  return (
    <div style={style}>
      <Link to='/blogs' style={padding}>
        blogs
      </Link>
      <Link to='/users' style={padding}>
        users
      </Link>
      <LoginInfo style={padding} />
    </div>
  )
}

export default NavigationMenu
