import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

export const useLikeBlog = (blog) => {
  const dispatch = useDispatch()

  if (!blog) return null

  const like = () => {
    blog.likes++
    dispatch(likeBlog(blog))
  }
  return like
}