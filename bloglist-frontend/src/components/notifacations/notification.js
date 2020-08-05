import React from 'react'
import './notification.css'

const notification = ({ type, message }) => (
  <div className={`user-ops ${type}`}>
    <p>{message}</p>
  </div>
)

export default notification