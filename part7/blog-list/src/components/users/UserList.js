import React from 'react'
import User from './User'

const UserList = ({ users }) => (
  <div>
    <h2 style={{ margin: 0 }}>Users</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '12em' }}>
      <h4>User</h4>
      <h4>Blogs Created</h4>
    </div>
    {users.map(user => <User key={user.id} user={user} />)}
  </div>
)

export default UserList