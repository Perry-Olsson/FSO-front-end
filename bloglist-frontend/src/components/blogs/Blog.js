import React from 'react'
import './Blog.css'
const Blog = ({ blog, deleteBlog, id }) => (
  <div className='blog'>
    <p><b>Title: </b>{blog.title}</p>
    <p><b>Author: </b>{blog.author}</p> 
    <button onClick={() => deleteBlog(id)}>Delete</button>
  </div>
)

export default Blog
