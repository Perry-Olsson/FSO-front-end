import blogService from '../services/blogs'
import blogHelper from '../utils/blogHelper'
import { createNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'ADD_BLOG':
    return blogHelper.mapAndSortBlogs([...state, action.blog])
  case 'LIKE_BLOG':
    return blogHelper.mapAndSortBlogs(state, action.updatedBlog)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs: blogHelper.mapAndSortBlogs(blogs)
    })
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    blog
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.updateBlog({ ...blog, user: blog.user.id })
      dispatch({
        type: 'LIKE_BLOG',
        updatedBlog
      })
    }  catch(exception) {
      exception.response ? dispatch(createNotification({ type: 'failure', message: exception.response.data.error }, 5))
        : console.log(exception)
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      blogService.deleteBlog(id)
      dispatch({
        type: 'DELETE_BLOG',
        id
      })
      dispatch(createNotification({ type: 'success', message: 'blog removed' }, 5))
    }  catch (exception) {
      dispatch(createNotification({ type: 'failure', message: exception.response.data.error }))
    }
  }
}

export default blogReducer