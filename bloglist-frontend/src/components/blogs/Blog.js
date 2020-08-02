import React, {useState} from 'react'
import './Blog.css'
const Blog = ({ blog, deleteBlog, likeBlog }) => {
  const [show, setShow] = useState(false)
  const buttonHeight = { height: show ? '6rem' : ''}
  const buttonLabel = show ? 'hide' : 'view'

  const like = () => {
    blog.likes++
    likeBlog({ ...blog, user: blog.user.id })
  }

  return (
  <div className='blog flex'>
  <div>
    <p><b>{blog.title}</b></p>
    {show && (
      <>
      <p><b>Author: </b>{blog.author}</p> 
      <p><b>Likes: </b>{blog.likes}<button className='likes' onClick={like}>like</button></p>
      <p><b>Url: </b>{blog.url}</p>
      <button className='delete' onClick={() => deleteBlog(blog.id)}>Delete</button>
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
