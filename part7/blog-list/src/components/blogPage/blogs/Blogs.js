import React from 'react'
import Togglable from '../../togglable/Togglable'
import AddBlog from './addBlog/AddBlog'
import BlogList from './blogList/BlogList'

const Blogs = ({ user, blogs }) => {
  return <div>
    {user && (
      <Togglable buttonLabel='New blog' visible={false}>
        <AddBlog />
      </Togglable>
    )}
    <hr className='margin-bottom'/>
    {blogs && <BlogList
      blogs={blogs}
      user={user}
    /> }
  </div>
}

export default Blogs