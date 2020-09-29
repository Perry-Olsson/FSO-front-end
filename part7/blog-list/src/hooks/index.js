import { useDispatch } from 'react-redux';
import { saveLike } from '../reducers/userReducer';

export const useLikeBlog = (blog, user) => {
  const dispatch = useDispatch();

  if (!blog || !user) return null;

  const like = () => {
    blog.likes++;
    dispatch(saveLike(user, blog));
  };
  return like;
};
