import React from 'react'
import { useSelector } from 'react-redux'
import './notification.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return notification ? (
    <div className={`user-ops ${notification.type}`}>
      <p>{notification.message}</p>
    </div>
  ) :
    null
}

export default Notification