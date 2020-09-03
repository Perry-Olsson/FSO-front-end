import React from 'react'
import NavBar from './NavBar'
import Notification from '../notifacations/Notification'
import Togglable from '../togglable/Togglable'
import Login from '../login/Login'

const Navigation = ({ user }) => {
  return user ? (
    <>
      <NavBar user={user} />
      <Notification />
    </>
  )
    :(
      <>
        <Notification />
        <Togglable buttonLabel='Log in' visible={true}>
          <Login />
        </Togglable>
      </>
    )
}

export default Navigation