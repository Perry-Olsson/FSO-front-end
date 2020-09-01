import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(props.visible)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  return (
    <>
      <div style={showWhenVisible}>
        {React.cloneElement(props.children, { toggleVisibility })}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
      <div style={hideWhenVisible} className='togglableContent'>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
    </>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable