import React from 'react'

const UserProfile = ({ user }) => {
  if(!user) return null
  return (
    <div>
      <h2>{user.username}</h2>
      <h4>Blogs</h4>
      { user.blogs.length
        ? <ul>
          {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
        : <p>uh oh there&apos;s no blogs</p>}
    </div>
  )
}

export default UserProfile