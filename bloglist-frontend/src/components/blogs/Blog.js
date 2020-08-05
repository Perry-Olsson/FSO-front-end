import React, { useState } from 'react'
import './Blog.css'
const Blog = ({
  blog,
  user,
  deleteBlog,
  likeBlog
}) => {
  const [show, setShow] = useState(false)
  const buttonHeight = { height: show ? '6rem' : '' }
  const buttonLabel = show ? 'hide' : 'view'

  const like = () => {
    blog.likes++
    likeBlog(blog)
  }

  const confirmDeletion = () => {
    if (window.confirm(`delete ${blog.title}?`))
      deleteBlog(blog.id)
  }

  return (
    <div className='blog flex'>
      <div>
        <p style={{ 'fontSize': '1.5rem' }}><b>{blog.title}</b></p>
        {show && (
          <>
            <p><b>Author: </b>{blog.author}</p>
            <p><b>Likes: </b>{blog.likes}<button className='likes' onClick={like}>like</button></p>
            <p><b>Url: </b>{blog.url}</p>
            {user === blog.user.username &&
      <button className='delete' onClick={confirmDeletion}>Delete</button>
            }
          </>
        )
        }
      </div>
      <div style={buttonHeight}>
        <button className='view' onClick={() => setShow(!show)}>{buttonLabel}</button>
      </div>
    </div>
  )}

export default Blog
