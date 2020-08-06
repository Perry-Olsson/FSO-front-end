import React, { useState, useEffect, useRef } from 'react'
import Login from './components/login/Login'
import Blog from './components/blogs/Blog'
import AddBlog from './components/blogs/AddBlog'
import Togglable from './components/togglable/Togglable'
import Notification from './components/notifacations/notification'
import blogHelper from './utils/blogHelper'
import loginService from './services/login'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({ display: false, type: 'success', message: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogHelper.mapAndSortBlogs(blogs) )
    )
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
      const addedBlog = await blogService.addBlog(newBlog)
      const updatedBlogs = blogHelper.mapAndSortBlogs([...blogs, addedBlog])
      setBlogs(updatedBlogs)
      handleNotification('success', `${addedBlog.title} by ${addedBlog.author} added`)
      addBlogRef.current.toggleVisibility()
    } catch (exception) {
      exception.response ? handleNotification('failure', exception.response.data.error)
        : console.log(exception)
    }
  }

  const handleLikeBlog = async (blog) => {
    try {
      const response = await blogService.updateBlog({ ...blog, user: blog.user.id })
      const updatedBlogs = blogHelper.mapAndSortBlogs(blogs, response.data.id)
      // setBlogs(blogHelper.sortBlogs(blogs.map(b =>  b.id === response.data.id ? blog : b)))
      setBlogs(updatedBlogs)
    } catch(exception) {
      exception.response ? handleNotification('failure', exception.response.data.error)
        : console.log(exception)
    }

  }

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      handleNotification('success', 'Blog removed')
    } catch (exception) {
      handleNotification('failure', exception.response.data.error)
    }
  }

  const handleNotification = (type, message) => {
    setNotification({ display: true, type, message })
    setTimeout(() => setNotification({ display: false, message: null }), 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return user ? (
    <div>
      <h1>Blogs</h1>
      {notification.display && <Notification type={ notification.type } message={ notification.message } />}
      <h4>{user.username} logged in</h4>
      <button className='logout' onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='New blog' ref={addBlogRef}>
        <AddBlog
          createBlog={handleAddBlog}
        />
      </Togglable>
      <hr className='margin-bottom'/>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user.username}
          deleteBlog={handleDeleteBlog}
          likeBlog={handleLikeBlog}
        />
      )}
    </div>
  ) :
    (
      <div>
        <h1>Login</h1>
        {notification.display && <Notification type={ notification.type } message={ notification.message } />}
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
}

export default App