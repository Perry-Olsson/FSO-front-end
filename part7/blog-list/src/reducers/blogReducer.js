import blogService from '../services/blogs'
import blogHelper from '../utils/blogHelper'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'ADD_BLOG':
    console.log(state, action.blog)
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

export const addBlog = (newBlog) => {
  return async dispatch => {
    const res = await blogService.addBlog(newBlog)
    dispatch({
      type: 'ADD_BLOG',
      blog: res
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateBlog({ ...blog, user: blog.user.id })
    dispatch({
      type: 'LIKE_BLOG',
      updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export default blogReducer