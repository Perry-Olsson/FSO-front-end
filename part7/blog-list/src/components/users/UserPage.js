import React, { useState, useEffect } from 'react'
import userService from '../../services/users'
import blogHelper from '../../utils/blogHelper'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import UserList from './UserList'
import UserProfile from './UserProfile'

const UserPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(res => { setUsers(blogHelper.mapAndSortUsers(res)) })
  }, [])

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <Switch>
      <Route path='/users/:id'>
        <UserProfile user={user} />
      </Route>
      <Route path='/users'>
        <UserList users={users} />
      </Route>
    </Switch>
  )
}

export default UserPage