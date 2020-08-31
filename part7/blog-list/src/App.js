import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import Login from './components/login/Login'
import BlogList from './components/blogs/BlogList'
import AddBlog from './components/blogs/addBlog/AddBlog'
import Togglable from './components/togglable/Togglable'
import Notification from './components/notifacations/Notification'
import blogHelper from './utils/blogHelper'
import loginService from './services/login'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlogRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      handleNotification('success', 'login successful')
    } catch(exception) {
      setUsername('')
      setPassword('')
      handleNotification('failure', exception.response.data.error)
    }
  }

  const handleAddBlog = async (newBlog) => {
    try {
      dispatch(addBlog(newBlog))
      handleNotification('success', 'blog Added')
      addBlogRef.current.toggleVisibility()
    } catch (exception) {
      exception.response ? handleNotification('failure', exception.response.data.error)
        : console.log(exception)
    }
  }

  const handleLikeBlog = async (blog) => {
    try {
      dispatch(likeBlog(blog))
    } catch(exception) {
      exception.response ? handleNotification('failure', exception.response.data.error)
        : console.log(exception)
    }

  }

  const handleDeleteBlog = async (id) => {
    try {
      dispatch(deleteBlog(id))
      handleNotification('success', 'Blog removed')
    } catch (exception) {
      handleNotification('failure', exception.response.data.error)
    }
  }

  const handleNotification = (type, message) => {
    dispatch(createNotification({ type, message }, 5))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user ?
        (
          <>
            <h4>{user.username} logged in</h4>
            <button className='logout' onClick={handleLogout}>logout</button>
            <Togglable buttonLabel='New blog' visible={false} ref={addBlogRef}>
              <AddBlog
                createBlog={handleAddBlog}
              />
            </Togglable>
          </>
        ) :
        (
          <Togglable buttonLabel='Log in' visible={true}>
            <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          </Togglable>
        )
      }
      <hr className='margin-bottom'/>
      {blogs && <BlogList
        blogs={blogs}
        user={user}
        handleDeleteBlog={handleDeleteBlog}
        handleLikeBlog={handleLikeBlog}
      />}
    </div>
  )
}

export default App