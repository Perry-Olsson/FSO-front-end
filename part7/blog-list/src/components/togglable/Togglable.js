import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(props.visible)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  return (
    <>
      <div style={showWhenVisible}>
        {React.cloneElement(props.children, { toggleVisibility })}
        <Button onClick={toggleVisibility} variant='outline-secondary'>cancel</Button>
      </div>
      <div style={hideWhenVisible} className='togglableContent'>
        <Button onClick={toggleVisibility} variant='outline-dark'>{props.buttonLabel}</Button>
      </div>
    </>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable