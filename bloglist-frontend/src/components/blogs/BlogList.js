import React from 'react'
import Blog from './blog/Blog'

const BlogList = ({ blogs, user, handleDeleteBlog, handleLikeBlog }) => {
  return (
    <div id='blogList'>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user ? user.username : ''}
          deleteBlog={handleDeleteBlog}
          likeBlog={handleLikeBlog}
        />)}
    </div>
  )
}

export default BlogList