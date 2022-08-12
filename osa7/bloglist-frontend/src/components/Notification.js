import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const notificationStyle = {
    fontSize: 16,
    color: 'green',
    background: 'lightgray',
    borderRadius: 5,
    borderStyle: 'solid',
    padding: 5,
    marginBottom: 10,
  }
  const errorStyle = { ...notificationStyle, color: 'red' }

  return (
    <div
      className='error'
      style={notification.error ? errorStyle : notificationStyle}
    >
      {notification.text}
    </div>
  )
}

export default Notification
