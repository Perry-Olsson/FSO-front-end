import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../../../../../reducers/blogReducer'
import { useLikeBlog } from '../../../../../hooks'
import { Link } from 'react-router-dom'
import './Blog.css'
const Blog = ({
  blog,
  user,
}) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const buttonHeight = { height: show ? '6rem' : '' }
  const buttonLabel = show ? 'hide' : 'view'

  const like = useLikeBlog(blog)

  const confirmDeletion = () => {
    if (window.confirm(`delete ${blog.title}?`))
      dispatch(deleteBlog(blog.id))
  }

  return (
    <div className={`blog flex ${blog.title.replace(/ /gm, '-')}`}>
      <div className='blogInfoTest'>
        <p id='blogInfo' style={{ 'fontSize': '1.5rem' }}>{blog.title} | {blog.author}</p>
        {show && (
          <>
            <p className='likesTest'><b>Likes: </b><span className='likesSelector'>{blog.likes}</span><button className='likes' onClick={like}>like</button></p>
            <p className='urlTest blogUrl'><b>Url: </b>{blog.url}</p>
            {user === blog.user.username &&
      <button className='delete' onClick={confirmDeletion}>Delete</button>
            }
          </>
        )
        }
      </div>
      <div style={buttonHeight}>
        <Link to={`/blogs/${blog.id}`}><button className='view' onClick={() => setShow(!show)}>{buttonLabel}</button></Link>
      </div>
    </div>
  )}

export default Blog
