import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Blogs from './blogs/Blogs'
import BlogProfile from './blogProfile/BlogProfile'


const BlogPage = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  const match = useRouteMatch('/blogs/:id')
  const matchedBlog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <Switch>
      <Route path='/blogs/:id'>
        <BlogProfile blog={matchedBlog} />
      </Route>
      <Route path='/'>
        <Blogs user={user} blogs={blogs} />
      </Route>

    </Switch>)
}

export default BlogPage