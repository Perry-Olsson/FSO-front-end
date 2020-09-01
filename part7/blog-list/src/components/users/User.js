import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', width: '12em' }}>
    <div><Link to={`/users/${user.id}`}>{user.username}</Link></div>
    <div><b>{user.blogs.length}</b></div>
  </div>
)

export default User