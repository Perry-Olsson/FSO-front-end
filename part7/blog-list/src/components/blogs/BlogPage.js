import React from 'react'
import { useLikeBlog } from '../../hooks'

const BlogPage = ({ blog }) => {
  const like = useLikeBlog(blog)

  if (!blog)
    return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><a href='/'>{blog.url}</a></p>
      <p>{blog.likes} likes<button style={{ marginLeft: '1em', width: 'fit-content' }} onClick={like} >like</button></p>
      <p>added by <b>{blog.user.username}</b></p>
    </div>
  )
}

export default BlogPage