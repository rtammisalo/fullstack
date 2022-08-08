import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

let timerId = null

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const message = notification.message
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (timerId) {
    clearTimeout(timerId)
    timerId = null
  }

  if (message) {
    timerId = setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <div style={message ? style : { display: 'none' }}>
      {message}
    </div>
  )
}

export default Notification