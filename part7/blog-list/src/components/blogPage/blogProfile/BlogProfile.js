import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLikeBlog } from '../../../hooks';
import {
  addComment,
  deleteComment,
  deleteBlog,
} from '../../../reducers/blogReducer';
import AddComment from './AddComment';
import { Button } from 'react-bootstrap';
import Togglable from '../../togglable/Togglable';
import './blogProfile.css';
import LikeButton from './LikeButton';

const BlogProfile = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  if (!blog) return null;

  const createComment = async (event, comment) => {
    event.preventDefault();
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
      <h2>{blog.title}</h2>
      <iframe title={blog.title} src={blog.url} className="embeddedBlog" />
      <div style={{ margin: '1em 0', display: 'flex' }}>
        <a href={blog.url} rel="noopener noreferrer" target="_blank">
          <Button variant="outline-dark">visit page</Button>
        </a>
        <p>
          <LikeButton blog={blog} />
          {blog.likes} likes
        </p>
      </div>
      <p>
        added by <b>{blog.user.username}</b>
      </p>
      {user && user.username === blog.user.username && (
        <button className="delete" onClick={confirmDeletion}>
          Delete
        </button>
      )}
      <div>
        <h4>Comments:</h4>
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>
              {comment.comment}
              {user && user.username === comment.user && (
                <Button
                  variant="outline-danger"
                  onClick={() => del(comment.id)}
                  style={{ width: 'fit-content', marginLeft: '1em' }}
                >
                  delete
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {user && (
        <Togglable buttonLabel="Comment" visible={false} size="sm">
          <AddComment createComment={createComment} />
        </Togglable>
      )}
    </div>
  );
};

export default BlogProfile;
