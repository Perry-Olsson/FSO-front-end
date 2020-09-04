import React from 'react'
import User from './User'
import { ListGroup } from 'react-bootstrap'

const UserList = ({ users }) => (
  <div>
    <h2 style={{ margin: '1em 0' }}>Users</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '21em' }}>
      <h4>User</h4>
      <h4>Blogs Created</h4>
    </div>
    <ListGroup>
      {users.map(user =>
        <ListGroup.Item key={user.id}>
          <User  user={user} />
        </ListGroup.Item>)
      }
    </ListGroup>
  </div>
)

export default UserList