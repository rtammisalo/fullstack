import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const message = notification.message
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={message ? style : { display: 'none' }}>
      {message}
    </div>
  )
}

export default Notification