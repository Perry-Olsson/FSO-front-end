import React from 'react'
import { Link } from 'react-router-dom'
import './Blog.css'

const Blog = ({ blog }) => (
  <div className={`blog flex ${blog.title.replace(/ /gm, '-')}`}>
    <div className='blogInfoTest'>
      <p id='blogInfo' style={{ 'fontSize': '1.5rem' }}>{blog.title} | {blog.author}</p>
    </div>
    <div>
      <Link to={`/blogs/${blog.id}`}><button className='view'>view</button></Link>
    </div>
  </div>
)

export default Blog
