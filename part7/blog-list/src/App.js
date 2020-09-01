import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import Login from './components/login/Login'
import BlogList from './components/blogs/BlogList'
import BlogPage from './components/blogs/BlogPage'
import UserPage from './components/users/UserPage'
import AddBlog from './components/blogs/addBlog/AddBlog'
import Togglable from './components/togglable/Togglable'
import Notification from './components/notifacations/Notification'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const match = useRouteMatch('/blogs/:id')
  const matchedBlog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <h1>Blogs</h1>
      {user
        ? (
          <>
            <NavBar user={user} handleLogout={handleLogout} />
            <Notification />
          </>
        )
        :(
          <Togglable buttonLabel='Log in' visible={true}>
            <Login />
          </Togglable>
        )
      }
      <Switch>
        <Route path='/users'>
          <UserPage />
        </Route>
        <Route path='/blogs/:id'>
          <BlogPage blog={matchedBlog} />
        </Route>
        <Route path='/'>
          {user && (
            <Togglable buttonLabel='New blog' visible={false}>
              <AddBlog />
            </Togglable>
          )}
          <hr className='margin-bottom'/>
          {blogs && <BlogList
            blogs={blogs}
            user={user}
          />}
        </Route>
      </Switch>
    </div>
  )
}

export default App