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

const BlogProfile = ({ blog }) => {
  const dispatch = useDispatch();
  const like = useLikeBlog(blog);
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
      <iframe
        title={blog.title}
        src={blog.url}
        style={{
          width: '100%',
          height: '20em',
          border: 'solid 2px #444444',
          borderRadius: '4px',
        }}
      />
      <div style={{ margin: '1em 0', display: 'flex' }}>
        <a href={blog.url} rel="noopener noreferrer" target="_blank">
          <Button variant="outline-dark">visit page</Button>
        </a>
        <p>
          <Button
            variant="outline-info"
            style={{ margin: '0 1em', width: 'fit-content' }}
            onClick={like}
          >
            like
          </Button>
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
                <button
                  onClick={() => del(comment.id)}
                  style={{ width: 'fit-content', marginLeft: '1em' }}
                >
                  delete
                </button>
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
