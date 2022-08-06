import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropType from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => { setVisible(!visible) }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      {!visible &&
        <button onClick={toggleVisibility}>{props.showLabel}</button>
      }
      {visible &&
        <>
          {props.children}
          <button onClick={toggleVisibility}>{props.hideLabel}</button>
        </>
      }
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  showLabel: PropType.string,
  hideLabel: PropType.string,
  children: PropType.node
}

export default Togglable