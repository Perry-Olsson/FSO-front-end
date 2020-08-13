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
      <div className='blogInfoTest'>
        <p style={{ 'fontSize': '1.5rem' }}><b>{blog.title} | {blog.author}</b></p>
        {show && (
          <>
            <p className='likesTest'><b>Likes: </b>{blog.likes}<button className='likes' onClick={like}>like</button></p>
            <p className='urlTest blogUrl'><b>Url: </b>{blog.url}</p>
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
