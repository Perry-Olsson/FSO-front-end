import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Navigation from './components/navigation/Navigation'
import BlogPage from './components/blogs/blogPage/BlogPage'
import BlogProfile from './components/blogs/blogProfile/BlogProfile'
import UserPage from './components/users/UserPage'
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

  return (
    <div>
      <h1>Blogs</h1>
      <Navigation user={user} />
      <Switch>
        <Route path='/users'>
          <UserPage />
        </Route>
        <Route path='/blogs/:id'>
          <BlogProfile blog={matchedBlog} />
        </Route>
        <Route path='/'>
          <BlogPage user={user} blogs={blogs} />
        </Route>
      </Switch>
    </div>
  )
}

export default App