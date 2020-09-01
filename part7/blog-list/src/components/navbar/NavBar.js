import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const style = { padding: 2.5 }
  return (
    <div>
      <Link style={style} to='/' >Blogs</Link>
      <Link style={style} to='/users'>Users</Link>
    </div>
  )
}

export default NavBar