import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
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
    <div className="error" style={message.error ? errorStyle : notificationStyle} >
      {message.text}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.object
}

export default Notification