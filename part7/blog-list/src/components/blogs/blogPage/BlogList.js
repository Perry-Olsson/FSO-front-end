import React from 'react'
import Blog from '../blog/Blog'

const BlogList = ({ blogs, user }) => {
  return (
    <div id='blogList'>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user ? user.username : ''}
        />)}
    </div>
  )
}

export default BlogList