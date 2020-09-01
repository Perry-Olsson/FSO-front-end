import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'lightgray', padding: '1em', marginBottom: '1em' }}>
      <div>
        <Link style={{ paddingRight: '1.5em' }} to='/' >Blogs</Link>
        <Link to='/users'>Users</Link>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ paddingRight: '1em' }}>{user.username} logged in</div>
        <button className='logout' onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default NavBar