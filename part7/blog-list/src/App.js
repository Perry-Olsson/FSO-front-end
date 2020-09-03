import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import BlogPage from './components/blogs/blogPage/BlogPage'
import UserPage from './components/users/UserPage'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
    }
  }, [dispatch])

  return (
    <div>
      <h1>Blogs</h1>
      <Navigation user={user} />
      <Switch>
        <Route path='/users'>
          <UserPage />
        </Route>
        <Route path='/'>
          <BlogPage user={user} />
        </Route>
      </Switch>
    </div>
  )
}

export default App