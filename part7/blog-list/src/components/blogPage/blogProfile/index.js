import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addComment,
  deleteComment,
  deleteBlog,
} from '../../../reducers/blogReducer';
import Profile from './Profile';
import CommentSection from './CommentSection';
import './blogProfile.css';

const BlogProfile = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  if (!blog) return null;

  const createComment = async comment => {
    dispatch(addComment({ value: comment, blog, user }));
  };

  const del = async commentId => {
    dispatch(deleteComment(blog.id, commentId));
  };

  const confirmDeletion = () => {
    if (window.confirm(`delete ${blog.title}?`)) dispatch(deleteBlog(blog.id));
  };

  return (
    <div style={{ margin: '2em 0' }}>
      <Profile blog={blog} confirmDeletion={confirmDeletion} />
      <CommentSection blog={blog} del={del} createComment={createComment} />
    </div>
  );
};

export default BlogProfile;
